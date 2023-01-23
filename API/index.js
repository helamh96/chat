import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { Server} from "socket.io"
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import typeDefs from './GQLtypes.js';
import resolvers from './resolvers.js';
import dotenv from "dotenv"

dotenv.config()

const schema = makeExecutableSchema({typeDefs, resolvers})

const app = express()
const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
  server:httpServer,
  path:"/graphql"
})

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
  {
    async serverWillStart(){
      return{
        async drainServer(){
          await serverCleanup.dispose()
        }
      }
    }
  }]
});

await server.start()

app.use("/",
  cors(),
  bodyParser.json(),
  expressMiddleware(server)
)

const PORT = process.env.PORT

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

//SocketIO

let users = []

const io = new Server(httpServer, {
  cors:{
    origin: "http://localhost:3000"
  }
})

const newUser =(convID, userID, socketId) =>{
  if(!users.some(user => user.userID === userID)){
    users.push({convID, userID,socketId})
  }
   
};

const removeUser =(socketId) =>{
  users = users.filter(user =>user.socketId !== socketId)
}

const getUsers =(convID)=>{
  let destinatary = users.filter(user => user.convID = convID);
  return destinatary
}

io.on("connection", (socket) =>{
  socket.on("newUser", (args)=>{
      newUser(args.convID, args.userID, socket.id);
  });

  socket.on("disconnect", ()=>{
      removeUser(socket.id)
  })

  socket.on("sendMsg", ({convID, remittent, msg, timestamp, isImage})=>{
    console.log("received")
      const destinataries = getUsers(convID);
      if(destinataries.length > 0){
        destinataries.forEach(e => {
          io.to(e.socketId).emit("getMsg",{
              convID:convID,
              remittent:remittent,
              msg: msg,
              timestamp: timestamp,
              isImage:isImage
          })
        })         
      }   
    })
  });


