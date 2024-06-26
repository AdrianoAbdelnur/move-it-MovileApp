import { createContext, useReducer } from "react";

export const PostContext = createContext();

import React from "react";
import PostReducer from "../reducers/PostReducer";
import { clientAxios } from "../api/ClientAxios";
import { TYPES } from "../actions/PostActions";

const PostsProvider = ({ children }) => {
  const initialValues = {
    alertMsg: "",
    posts: [],
  };

  const [state, dispatch] = useReducer(PostReducer, initialValues);

  const getAllPosts = async () => {
    try {
      const { data } = await clientAxios("/userPost/getClients");
      const { clientsList } = data;
      if (clientsList) {
        dispatch({
          type: types.customers.getCustomers,
          payload: { customers: clientsList },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPosts = async (userId) => {
    try {
      const { data } = await clientAxios("/userPost/myPosts/" + userId);
      const { myPost } = data;

      if (myPost) {
        dispatch({
          type: TYPES.GETPOSTS,
          payload: { myPost },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingPosts = async () => {
    try {
      const { data } = await clientAxios("/userPost/pendingPosts");
      const { pendingPost } = data;
      if (pendingPost) {
        dispatch({
          type: TYPES.GETPENDINGPOSTS,
          payload: { pendingPost },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async (postData) => {
    try {
      const { data } = await clientAxios.post("/userPost/addPost", postData);
      const { newPost } = data;
      if (newPost) {
        dispatch({
          type: TYPES.ADDNEWPOST,
          payload: { alertMsg: "New Post added", newPost },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearAlertMsg = () => {
    dispatch({
      type: TYPES.CLEARALERTMSG,
      payload: { alertMsg: "" },
    });
  };

  return (
    <PostContext.Provider
      value={{
        state,
        addPost,
        getAllPosts,
        getMyPosts,
        getPendingPosts,
        clearAlertMsg,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostsProvider;
