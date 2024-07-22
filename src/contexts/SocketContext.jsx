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
  } = useContext(PostContext);
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

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
        (post) => newMessage.postId === post._id
      );
      if (postFound) {
        uptateMyStatus({
          postId: postFound._id,
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
