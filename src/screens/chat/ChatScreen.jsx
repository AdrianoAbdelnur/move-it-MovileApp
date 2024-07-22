import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostsContext";
import { SocketContext } from "../../contexts/SocketContext";

export const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { state: userState } = useContext(AuthContext);
  const {
    state: postState,
    addMessage,
    updateMessage,
    uptateStatus,
  } = useContext(PostContext);
  const { socket, newMessage, removeNewMessage, sendPrivateMessage } =
    useContext(SocketContext);

  useEffect(() => {
    setMessages(route?.params?.post?.chatMessages);
    const newStatusMessage =
      userState.user.role === "user"
        ? { newTransportMessage: false }
        : { newUserMessage: false };

    uptateStatus({
      postId: route?.params?.post?._id,
      newStatus: {
        ...route?.params?.post?.status,
        messagesStatus: {
          ...route?.params?.post?.status.messagesStatus,
          ...newStatusMessage,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (
      newMessage &&
      newMessage?.text !== route?.params?.post?.chatMessages[0]?.text
    ) {
      setMessages((prevMessages) => [
        { ...newMessage, _id: new Date().toString() },
        ...prevMessages,
      ]);
      removeNewMessage();
    }
  }, [newMessage]);

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
        text: currentMessage,
        recipient:
          userState.user.role === "user"
            ? route.params.post?.offerSelected?.owner._id
            : route.params.post?.owner._id,
        postId: route.params.post?._id,
      };
      sendPrivateMessage(messageData);
      setCurrentMessage("");
      updateMessage({ postId: route.params.post?._id, newMessage });
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
