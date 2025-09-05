import React from "react";
import Posts from "./dashboard/posts";
import { UseUser } from "../hooks/useUser";

const Dashboard = () => {
  const { user } = UseUser();
  if (!user) return <p> user not found! </p>;
  return (
    <div>
      {" "}
      <Posts />{" "}
    </div>
  );
};

export default Dashboard;
