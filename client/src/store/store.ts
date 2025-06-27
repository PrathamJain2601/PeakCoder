// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import problemReducer from "./problem";
import codeReducer from "./code";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Dynamic import for localStorage (safe for Next.js)
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },

  };
};

const createStorage = async () => {
  if (typeof window !== "undefined") {
    const storageModule = await import("redux-persist/lib/storage");
    return storageModule.default;
  } else {
    return createNoopStorage();
  }
};
const rootReducer = combineReducers({
  user: userReducer,
  problem: problemReducer,
  code: codeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
