import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config();

import Connection from "./database/db.js";

import {
  getDocument,
  updateDocument,
} from "./controller/document-controller.js";

const PORT = process.env.PORT || 9000;

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/MyDoc";
Connection(DB_URL);

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const httpServer = createServer(app);
httpServer.listen(PORT);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await getDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await updateDocument(documentId, data);
    });
  });
});
