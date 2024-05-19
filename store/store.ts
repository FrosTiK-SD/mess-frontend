import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from "@reduxjs/toolkit";

// Persist
import AsyncStorage from "redux-persist/lib/storage";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// Slices
import counterSlice from "./states/counterSlice.js";
import idStoreSlice from "./states/idStore";
import resumeSlice from "./states/resumeSlice";
import themeSlice from "./states/themeSlice";
import userSlice from "./states/userSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme"],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  counter: counterSlice.reducer,
  theme: themeSlice.reducer,
  idStore: idStoreSlice.reducer,
  resume: resumeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: EnhancedStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: [
          "payload.formBuilderSchema",
          "payload.initialSchema",
          "payload.user",
          "user.currentUser",
          "form/updateFormStateContext",
        ],
        ignoredPaths: ["form", "user"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
