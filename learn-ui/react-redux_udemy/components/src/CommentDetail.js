import React from "react";

const CommentDetail = (props) => {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="alt-avatar" src={props.avatar} />
      </a>
      <div className="content">
        <a href="/" className="author">
          {props.author}
        </a>
        <div className="metadata">
          <span className="date">Commented at {props.commentedAt}</span>
        </div>
        <div className="text">{props.postText}</div>
      </div>
    </div>
  );
};

export default CommentDetail;
