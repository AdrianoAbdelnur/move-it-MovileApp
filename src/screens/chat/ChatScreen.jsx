import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import io from "socket.io-client";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostsContext";

const socket = io("https://move-it-backend-3.onrender.com/");

export const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { state: userState } = useContext(AuthContext);
  const { addMessage, updateMessage } = useContext(PostContext);

  useEffect(() => {
    setMessages(route?.params?.post?.chatMessages);
  }, []);

  useEffect(() => {
    socket.emit("newUser", userState?.user?.id);
    socket.on("privateMessage", (msg) => {
      setMessages((prevMessages) => [
        {
          _id: new Date().toString(),
          text: msg.message,
          sender: msg.sender,
        },
        ...prevMessages,
      ]);
      if (userState.user.role === "user") {
        updateMessage({
          postId: route.params.post?._id,
          newMessage: {
            _id: new Date().toString(),
            text: msg.message,
            sender: msg.sender,
          },
        });
      }
    });

    return () => {
      socket.off("mensaje");
    };
  }, []);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        sender: userState?.user?.id,
        text: currentMessage,
        date: new Date().toISOString(),
        _id: new Date().toISOString(),
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      addMessage({ postId: route.params.post?._id, message: newMessage });
      const messageData = {
        message: currentMessage,
        recipient:
          userState.user.role === "user"
            ? route.params.post?.offerSelected?.owner._id
            : route.params.post?.owner?._id,
      };
      socket.emit("privateMessage", messageData);
      setCurrentMessage("");
      if (userState.user.role === "user") {
        updateMessage({ postId: route.params.post?._id, newMessage });
      }
      if (userState.user.role === "transport") {
      }
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === userState?.user?.id
          ? styles.myMessage
          : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.messagesList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={currentMessage}
          onChangeText={setCurrentMessage}
          placeholder="Write a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 5,
    borderRadius: 10,
    maxWidth: "75%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1873CC",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#434B4D",
  },
  messageText: {
    color: "#fff",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
