import React from "react";
import { Link } from "react-router-dom";
const LinkPage = () => {
  return (
    <div className="container">
      <Link className="link-items" to={"/posts"}>
        To The Posts
      </Link>
    </div>
  );
};

export default LinkPage;
