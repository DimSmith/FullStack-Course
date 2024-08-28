import {Application, Router} from "https://deno.land/x/oak/mod.ts";

const connectedClients = new Map();

const app = new Application();
const port = 3000;
const router = new Router();

function broadcast(message){
    for (const client of connectedClients.values()){
        client.send(message);
    }
}

function broadcast_usernames(){
    const usernames = [...connectedClients.keys()];
    console.log("sending updated username list to all clients:"+JSON.stringify(usernames));
    broadcast(
        JSON.stringify({
            event: "update-users",
            usernames: usernames,
        })
    );
}

router.get("/start_web_socket",async(context)=>{
    const socket = await context.upgrade();
    const username = context.request.url.searchParams.get("username");
    if (connectedClients.has(username)){
        socket.close(1008,`Username ${username} is already taken`);
        return;
    }
    socket.username = username;
    connectedClients.set(username, socket);
    console.log(`new client connected: ${username}`);

    socket.onopen= ()=>{
        broadcast_usernames();
    }

    socket.onclose = ()=>{
        console.log(`Client ${socket.username} disconnected`);
        connectedClients.delete(socket.username);
        broadcast_usernames();
    }

    socket.onmessage = (msg) => {
        JSON.stringify({
            event: msg.event,
            target: msg.target,
            message: msg.message,
        })
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context)=>{
    await context.send({
        root: `${Deno.cwd()}/`,
        index: "public/index.html",
    })
});

console.log("listing at http://localhost:"+port);
await app.listen({port});