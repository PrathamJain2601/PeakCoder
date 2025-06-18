import { Server } from "socket.io";

let io: Server | null = null;

export const initializeWebSocket = (server: import("http").Server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://comx-frontend.vercel.app"],
    },
  });
};

export const sendRunResult = (userId: string, result: any) => {
  if (!io) return;
  io.to(userId).emit("run-result", result);
};

export const getIoInstance = () => io;
