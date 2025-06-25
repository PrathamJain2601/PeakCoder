"use client";

import { store, persistor } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { connectSocket, getSocket } from "@/lib/socket";
import { RootState } from "@/store/store";

const queryClient = new QueryClient();

function SocketReconnector({ bootstrapped }: { bootstrapped: boolean }) {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log("bootstrapped:", bootstrapped);
    console.log("came here", user);
    console.log("socket", getSocket());

    if (
      bootstrapped &&
      user.user?.id &&
      (!getSocket() || !getSocket()?.connected)
    ) {
      console.log("🔌 Reconnecting socket after page load...");
      connectSocket(user.user?.id);
    }
  }, [bootstrapped, user]);

  return null;
}

function ProviderElement({ children }: { children: ReactNode }) {
  const [bootstrapped, setBootstrapped] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => setBootstrapped(true)} // ✅ Properly handles redux-persist bootstrapping
      >
        <QueryClientProvider client={queryClient}>
          <SocketReconnector bootstrapped={bootstrapped} />
          {children}
        </QueryClientProvider>
      </PersistGate>
      <Toaster />
    </Provider>
  );
}

export default ProviderElement;
