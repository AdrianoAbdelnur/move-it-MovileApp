import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { PostContext } from "./PostsContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { state: userState } = useContext(AuthContext);
  const {
    state: postState,
    updateMessage,
    uptateMyStatus,
    addOfferInPostUser,
    addNewPostTransport,
  } = useContext(PostContext);
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [newOffer, setNewOffer] = useState(null);
  const [newPost, setNewPost] = useState(null);
  const [newPostStatus, setNewPostStatus] = useState(null);

  const sendPrivateMessage = (message) => {
    if (socket) {
      socket.emit("privateMessage", message);
    }
  };

  const removeNewMessage = () => {
    setNewMessage(null);
  };

  useEffect(() => {
    const socketInstance = io("https://move-it-backend-3.onrender.com/");
    setSocket(socketInstance);

    socketInstance.emit("newUser", userState?.user?.id);

    socketInstance.on("privateMessage", (msg) => {
      setNewMessage(msg);
    });

    socketInstance.on("offerNotification", (newOffer) => {
      setNewOffer(newOffer);
    });

    socketInstance.on("newPostNotification", (post) => {
      setNewPost(post);
    });

    socketInstance.on("OfferSelected", (postOfferSelected) => {
      const { owner } = postState.posts.find(
        (post) => post._id === postOfferSelected._id
      );
      setNewPost({
        ...postOfferSelected,
        owner,
        status: { ...postOfferSelected.status, offerAcepted: true },
      });
    });

    socketInstance.on("notifyNewStatus", (newStatus) => {
      setNewPostStatus(newStatus);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [userState]);

  useEffect(() => {
    if (newMessage) {
      updateMessage({
        postId: newMessage.postId,
        newMessage: {
          _id: new Date().toString(),
          text: newMessage.text,
          sender: newMessage.sender,
        },
      });
      const postFound = postState.posts.find(
        (post) => newMessage.postId === post?._id
      );
      if (postFound) {
        uptateMyStatus({
          postId: postFound?._id,
          newStatus: {
            ...postFound.status,
            messagesStatus:
              userState.user.role === "user"
                ? {
                    ...postFound.status.messagesStatus,
                    newTransportMessage: true,
                  }
                : {
                    ...postFound.status.messagesStatus,
                    newUserMessage: true,
                  },
          },
        });
      }
    }
  }, [newMessage]);

  useEffect(() => {
    if (newOffer) {
      addOfferInPostUser({
        postId: newOffer.post?._id,
        newOfferId: newOffer?._id,
        expiredTime: newOffer?.expiredTime,
        status: newOffer?.status,
        price: newOffer?.price,
        ownerId: newOffer?.owner?._id,
        ownerName: newOffer?.owner?.given_name,
        review: newOffer?.owner?.review,
        expoPushToken: newOffer?.owner?.expoPushToken,
      });
      uptateMyStatus({
        postId: newOffer?.post?._id,
        newStatus: { ...newOffer.post.status, newOffers: true },
      });
    }
  }, [newOffer]);

  useEffect(() => {
    if (userState.user.role === "transport" && newPost) {
      addNewPostTransport(newPost);
    }
  }, [newPost]);

  useEffect(() => {
    if (userState.user.role === "user") {
      uptateMyStatus({
        postId: newPostStatus?._id,
        newStatus: newPostStatus?.status,
      });
    }
  }, [newPostStatus]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        newMessage,
        removeNewMessage,
        sendPrivateMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
