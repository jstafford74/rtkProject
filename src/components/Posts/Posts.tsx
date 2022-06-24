import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../toolkit/hooks";
import {
  createPostThunk,
  fetchPostsThunk,
  
} from "../../features/postListSlice";
import { selectPosts,RootState } from "../../app/store";
import Post from "./Post";
import { JsxEmit } from 'typescript';

const Posts = () => {
  const dispatch = useAppDispatch();
  const [postText, setPostText] = useState("");  
  const {postList} = useSelector((state:RootState) => state.postList);


  useEffect(() => {
    if(!postList.length){
    dispatch(fetchPostsThunk());
    }


  }, []);


  const handlePostClick = () => {
    const id = Math.floor(Math.random() * 20);
    const postItem = {
      userId: id,
      title: "Test Title",
      body: postText,
    };
    dispatch(createPostThunk(postItem));
    setPostText("");
  };

  let $postList:JSX.Element |  JSX.Element[]=  <p>No Posts available</p>;
  if(postList?.length){
    $postList = postList?.map((post) => (
      <Post
        userId={post.userId}
        title={post.title}
        body={post.body}
        id={post.id}
        key={post.id}
      />
    ))
 
    }
   

  return (
    <Fragment>
      <div className="posts-container">
        <h2 className="posts-info">
          Feel free to post something to the board{" "}
        </h2>
        <div className="posts-items-container">
          {$postList}
        </div>
        <div className="posts-buttons-container">
          <input
            className="posts-textarea"
            placeholder="type a post here ..."
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          />
          <button className="posts-button" onClick={handlePostClick}>
            Post
          </button>
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts;
