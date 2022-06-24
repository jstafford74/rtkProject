import {
  configureStore,
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener, /* , ThunkAction, Action */
  ListenerEffectAPI,
} from '@reduxjs/toolkit';
import { getPosts } from "../api/post";
import postsReducer, { deletePostThunk,postListSlice} from "../features/postListSlice";

const listenMiddlewareInstance = createListenerMiddleware();
 //test
 export const store = configureStore({
  reducer: {
    postList: postsReducer,
  },
  middleware: (getDefaultMiddleware)=> 
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(
    listenMiddlewareInstance.middleware,
  )
});



export const selectPosts = (state: RootState) => state.postList.postList;
export const getCountDown = (state: RootState) => state.postList.countDown;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening = listenMiddlewareInstance.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;

