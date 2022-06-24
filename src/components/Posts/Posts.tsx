import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../toolkit/hooks";
import {
  createPostThunk,
  fetchPostsThunk,
  
} from "../../features/postListSlice";
import { selectPosts } from "../../app/store";
import Post from "./Post";

const Posts = () => {
  const dispatch = useAppDispatch();
  const postList = useSelector(selectPosts);
  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, []);

  const [postText, setPostText] = useState("");

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



  return (
    <Fragment>
      <div className="posts-container">
        <h2 className="posts-info">
          Feel free to post something to the board{" "}
        </h2>
        <div className="posts-items-container">
          {postList ? (
            postList?.map((post) => (
              <Post
                userId={post.userId}
                title={post.title}
                body={post.body}
                id={post.id}
              />
            ))
          ) : (
            <p>No Posts available</p>
          )}
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
