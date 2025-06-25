import { Server } from "socket.io";

let io: Server | null = null;

export const initializeWebSocket = (server: import("http").Server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://comx-frontend.vercel.app"],
      credentials: true,
      
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Client should emit this after connecting
    socket.on("login", ({ userId }) => {
      console.log("🧾 Received login event with userId:", userId);
      if (userId) {
        socket.join(userId);
        console.log(`✅ User ${userId} joined room`);
      } else {
        console.warn("⚠️ No userId provided for login event");
      }
    });


    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

// For sample runs (like "Run Code" button)
export const sendRunResult = (userId: string, result: any) => {
  if (!io) return;
  console.log(`📤 Emitting run-result to user ${userId} with result:`, result);
  io.to(userId).emit("run-result", result);
};


// For actual submissions (like "Submit" button)
export const sendSubmissionResult = (userId: string, result: any) => {
  if (!io) return;
  io.to(userId).emit("submission-result", result);
};

export const getIoInstance = () => io;
