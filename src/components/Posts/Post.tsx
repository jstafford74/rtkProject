import React, { Fragment, ReactNode } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Icon } from "@blueprintjs/core";
import { deletePostThunk, postListSlice } from "../../features/postListSlice";
import { useAppDispatch } from "../../toolkit/hooks";
import { getCountDown } from "../../app/store";
import { useSelector } from "react-redux";

interface IPostProps {
  userId: number | undefined;
  id: number | undefined;
  title: String | undefined;
  body: String | undefined;
}

const Post = (props: IPostProps) => {
  const dispatch = useAppDispatch();

  const countDown = useSelector(getCountDown)

  const handleDeletePostClick = () => {
    dispatch(deletePostThunk(props.id as number));
  };
  const handleUndoClick = () => {
    dispatch(postListSlice.actions.undoDelete);
  };
  return (
    <div className="post-container">
      <div className="post-section-container">
        <h3>UserId: </h3>
        <p className="post-text">{props.userId} </p>
      </div>
      <div className="post-section-container">
        <h3>Title:</h3>
        <p className="post-text">{props.title}</p>
      </div>
      <div className="post-body-container">
        <h4>Body</h4>
        <p className="post-text">{props.body}</p>
      </div>
      {countDown? (
        <button className="delete-post-btn" onClick={handleDeletePostClick}>
          Delete Post{" "}
          <span>
            <Icon icon={"trash"} />
          </span>
        </button>
      ) : (
        <button className="undo-delete-btn" onClick={handleUndoClick}>
          Undo?
          <span>
            <Icon icon={"undo"} />
            {countDown}
          </span>
        </button>
      )}
    </div>
  );
};

export default Post;
