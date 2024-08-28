import express, { NextFunction, Request, Response } from "express";
import { registerUser,loginUser} from "../logic/UserLogic";
import { checkJWT, createJWT } from "../Utils/jwt";

const loginRouter = express.Router();

loginRouter.post(
  "/loginUser",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userCred = request.body;
    try {
      const userData = await loginUser(userCred);
      if (userData && userData.token && userData.token.length > 10) {
        response
          .status(200)
          .header("Access-Control-Expose-Headers", "Authorization")
          .header("Authorization", userData.token)
          .json(userData);
      } else {
        response.status(401).json({ msg: "Incorrect email or password" });
      }
    } catch (error) {
      response.status(500).json({ msg: "An error occurred during login" });
    }
  }
);

loginRouter.post(
  "/registerUser",
  async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await registerUser(request.body);
        const token = result.token;
      response
        .status(201)
        .header("Access-Control-Expose-Headers", "Authorization")
        .header("Authorization", token)
        .json(result);
      } catch (error) {
        response.status(400).json({ message: "Email is already exists"});
      }
    }
);

loginRouter.post(
  "/getJWT",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userData = request.body;
    response.status(200).json({ jwt: createJWT(userData) });
  }
);

loginRouter.get(
  "/checkJWT/:token",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log("token: ", request.params.token);
    if (checkJWT(request.params.token)) {
      response.status(200).json({ msg: "all ok" });
    } else {
      response.status(401).json({ msg: "token is invalid" });
    }
  }
);



export default loginRouter;