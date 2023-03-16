import React from "react";
import ReactDOM from "react-dom";
import faker from "@faker-js/faker";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

const App = () => {
  return (
    <div className="ui container comments">
      <h3 className="ui header">Comments:</h3>
      <ApprovalCard>
        <CommentDetail
          author={faker.name.findName()}
          postText={faker.lorem.lines()}
          commentedAt={faker.date.past().toDateString()}
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author={faker.name.findName()}
          postText={faker.lorem.lines()}
          commentedAt={faker.date.past().toDateString()}
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author={faker.name.findName()}
          postText={faker.lorem.lines()}
          commentedAt={faker.date.past().toDateString()}
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <div className="ui section divider"></div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
