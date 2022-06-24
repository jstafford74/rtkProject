import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { getPosts } from "../api/post";
import postsReducer, { deletePostThunk,postListSlice. } from "../features/postListSlice";

const listenMiddleware = createListenerMiddleware();

listenMiddleware.startListening({
  actionCreator: postListSlice
  effect: async (action, listenerApi) => {
    //run whatever aditional side-effect-y logic
    console.log("this is running right" + action.payload.text);

    //Cancel other running instances
    // listenerApi.cancelActiveListeners()

    // run async logic
    const data = await getPosts();

    //Pause until action dispatched or state changed
    if (await listenerApi.condition()) {
      listenerApi.dispatch(deletePostThunk());
      listenerApi.unsubscribe();
  },
});

export const store = configureStore({
  reducer: {
    postList: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const selectPosts = (state: RootState) => state.postList.postList;
export const getCountDown = (state: RootState) => state.postList.countDown;
export type AppDispatch = typeof store.dispatch;
