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
    isLoading: false,
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

  const getPendingPosts = async (ownerId) => {
    try {
      const { data } = await clientAxios("/userPost/pendingPosts");
      const { pendingPost } = data;
      const { data: mySelectedPost } = await clientAxios(
        "/userPost/getMySelectedPosts/" + ownerId
      );
      const { yourOfferSelectedPosts } = mySelectedPost;
      const relevantPosts = [...pendingPost, ...yourOfferSelectedPosts];
      if (pendingPost) {
        dispatch({
          type: TYPES.GETPENDINGPOSTS,
          payload: { relevantPosts },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async (postData) => {
    dispatch({
      type: TYPES.LOADING,
      payload: { isLoading: true },
    });
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
          type: TYPES.UPDATEMYSTATUS,
          payload: { postId: data.newPost._id, newStatus: data.newPost.status },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uptateMyStatus = ({ postId, newStatus }) => {
    dispatch({
      type: TYPES.UPDATEMYSTATUS,
      payload: { postId, newStatus },
    });
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

  const addComplaint = async ({ postId, complaintText }) => {
    try {
      const { data } = await clientAxios.patch(
        "/userPost/addComplaint/" + postId,
        { complaintText }
      );
      dispatch({
        type: TYPES.UPDATEPOST,
        payload: { newPost: data.newPost, alertMsg: data.message },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkExpiredPost = (posts) => {
    const currentDate = new Date();
    const endOfCurrentDay = new Date(currentDate.setHours(0, 0, 0, 0));
    posts.map((post) => {
      const postDate = new Date(post?.date?.date);
      if (postDate < endOfCurrentDay && post.status.mainStatus === "pending") {
        uptateStatus({
          postId: post._id,
          newStatus: {
            ...post.status,
            mainStatus: "expired",
          },
        });
      }
    });
  };

  const isExpired = (post) => {
    const currentDate = new Date();
    const postDate = new Date(post.date.date);
    const timeDay = post.date.timeDay;
    const isSameDay = postDate.toDateString() === currentDate.toDateString();
    if (isSameDay) {
      if (timeDay === "At Any Time") {
        return false;
      }
      const currentHours = currentDate.getHours();
      const timeRanges = {
        Morning: 12,
        Afternoon: 18,
        Evening: 23,
      };

      if (currentHours > timeRanges[timeDay]) {
        return true;
      }
    } else if (postDate > currentDate) {
      return true;
    } else if (postDate < currentDate) {
      return false;
    }
  };

  const modifyOfferInPost = (offerInfo) => {
    dispatch({
      type: TYPES.ADDOFFERINPOST,
      payload: offerInfo,
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
        uptateMyStatus,
        addComplaint,
        checkExpiredPost,
        modifyOfferInPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostsProvider;
