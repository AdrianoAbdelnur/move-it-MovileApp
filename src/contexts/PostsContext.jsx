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

  const postSelectOffer = async (selectData) => {
    const { data } = await clientAxios.patch(
      "/userPost/selectOffer",
      selectData
    );
    if (data.postFound) {
      dispatch({
        type: TYPES.UPDATEPOST,
        payload: { newPost: data.postFound },
      });
    }
  };

  const addOfferInPost = async (offerInfo) => {
    try {
      const { data } = await clientAxios.put("/userPost/addNewOffer", {
        postId: offerInfo.postId,
        newOfferId: offerInfo.newOfferId,
      });
      if (data.newPost) {
        dispatch({
          type: TYPES.ADDOFFERINPOST,
          payload: offerInfo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uptateStatus = async ({ postId, newStatus }) => {
    try {
      const { data } = await clientAxios.patch("/userPost/modifyStatus", {
        postId,
        newStatus,
      });
      if (data.newPost) {
        dispatch({
          type: TYPES.UPDATEPOST,
          payload: { newPost: data.newPost },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMessage = async ({ postId, message }) => {
    try {
      const { data } = await clientAxios.patch(
        "/userPost/addMessage/" + postId,
        message
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessage = ({ postId, newMessage }) => {
    dispatch({
      type: TYPES.ADDMESSAGE,
      payload: { postId, newMessage },
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
        postSelectOffer,
        addOfferInPost,
        uptateStatus,
        addMessage,
        updateMessage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostsProvider;
