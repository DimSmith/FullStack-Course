#which operation system and version of node
FROM node:18-alpine

#Create app directory(destination)
WORKDIR /usr/src/app

#Install app dependencies(node_modules)
COPY package*.json ./

#Run the commands for proper installation
#run npm install for install all the dependencies into node_modules directory
RUN npm install

RUN npm install -g nodemon
RUN npm install -g ts-node

#copy all files from src directory to where . is current directory
COPY . .

#Which port we want to expose
EXPOSE 8080
EXPOSE 3306

CMD ["nodemon", "--exec", "ts-node", "server.ts"]

#for building the docker, just run the command => docker build . -t cars-api
#for running the docker, just run the command => docker run -p 8080:8080 cars-api


