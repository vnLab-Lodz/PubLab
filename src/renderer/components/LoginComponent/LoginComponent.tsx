import React from "react";
import { useDispatch } from "react-redux";
import { authorizeGitHubUserAsync } from "../../../shared/slices/currentUserSlice";
import { FaGithub } from "react-icons/fa";
import "./LoginComponent.scss";

const LoginComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div>Welcome to VNlab</div>
      <div>
        <button
          className="button"
          onClick={dispatch(
            authorizeGitHubUserAsync({
              clientId: process.env.GITHUB_CLIENT_ID,
              silent: false,
            })
          )}
        >
          Login to GitHub <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
