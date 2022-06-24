import axios from "axios";
import { IGetPostByIdParams, ICreatePostParams } from "../models/axios-model";
import { IPost } from "../models/post-model";

export const getPostbyid = async ({
  id,
}: IGetPostByIdParams): Promise<IPost | undefined> => {
  const res = await axios
    .get<IPost>(`https://jsonplaceholder.typicode.com/${id}`)
    .then((res) => res)
    .catch((err: any) => console.error(err.msg));
  if (res?.status === 200) return res.data as IPost;
};

export const getPosts = async (): Promise<IPost[] | undefined> => {
  const res = await axios
    .get<IPost[]>(`https://jsonplaceholder.typicode.com/posts`)
    .then((res?) => res)
    .catch((err: any) => console.error(err.msg));
  if (res?.status === 200) return res?.data as IPost[];
};

export const createPost = async (newPost: ICreatePostParams) => {
  const res = await axios.post(
    `https://jsonplaceholder.typicode.com/posts`,
    JSON.stringify(newPost)
  );
  const { id } = res.data;
  return {
    id,
    newPost,
  };
};

export const deletePost = async (id: number) => {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.data;
};
