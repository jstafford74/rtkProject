import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../models/post-model";
import { getPosts, createPost, deletePost } from "../api/post";
import { ICreatePostParams } from "../models/axios-model";

interface PostListSliceState {
  postList: IPost[];
  errors: [] | undefined;
  countDown: number | undefined;
}
const initialState: PostListSliceState = {
  postList: [],
  errors: [],
  countDown: undefined,
};

export const fetchPostsThunk = createAsyncThunk(
  "posts/getPosts",
  async (thunkAPI) => {
    const response = await getPosts();
    return response;
  }
);

export const createPostThunk = createAsyncThunk(
  "posts/createPost",
  async (postItem: ICreatePostParams, thunkAPI) => {
    const response = await createPost(postItem);
    return response;
  }
);

export const deletePostThunk = createAsyncThunk(
  "posts/deletePost",
  async (id: number, thunkApi) => {
    const response = await deletePost(id);
    return id;
  }
);

export const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {
    undoDelete: (state, action: PayloadAction) => {
      console.log("undo delete");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsThunk.fulfilled, (state, { payload }) => {
      if (payload) state.postList = payload;
    });
    builder.addCase(fetchPostsThunk.rejected, (state, { payload }) => {
      console.error(payload);
    });
    builder.addCase(fetchPostsThunk.pending, () => {
      console.log("pending");
    });
    builder.addCase(createPostThunk.fulfilled, (state, { payload }) => {
      Object.assign(state, { postList: [...state.postList, payload.newPost] });
      // make a deep copy of object - state (not root state) -> assign new props to this object based off of interface to not overstep over other states
    });
    builder.addCase(createPostThunk.rejected, (state, { payload }) => {
      console.error(payload);
    });
    builder.addCase(createPostThunk.pending, () => {
      console.log("pending");
    });
    builder.addCase(deletePostThunk.fulfilled, (state, { payload }) => {
      state.postList = state.postList.filter((item) => item.id !== payload);
    });
    builder.addCase(deletePostThunk.rejected, (state, { payload }) => {
      console.error(payload);
    });
    builder.addCase(deletePostThunk.pending, () => {
      console.log("pending");
    });
  },
});

export default postListSlice.reducer;
