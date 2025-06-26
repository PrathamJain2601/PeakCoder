import { io, Socket } from "socket.io-client";
import { store } from "@/store/store";
import { setRunResult } from "@/store/code";
import { setActiveTab, setSubmission, setSubmitPending } from "@/store/problem";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  console.log("🔌 Attempting to connect socket for user:", userId);
  if (socket && socket.connected) return;

  socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "", {
    withCredentials: true,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket?.id);
    console.log("📤 Emitting login with userId:", userId);
    socket?.emit("login", { userId });
  });

  socket.on("run-result", (data) => {
    console.log("📩 Received run-result:", data);
    store.dispatch(setRunResult(data.results));
  });

  socket.on("submission-result", (data)=> {
    console.log("📩 Received submit-result:", data);
    store.dispatch(setSubmission(data));
    store.dispatch(setActiveTab("submissions"));
    store.dispatch(setSubmitPending(false));
  })

  socket.on("disconnect", () => {
    console.log("⚠️ Socket disconnected:", socket?.id);
  });
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
