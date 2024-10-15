import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

export const BellNoti = ({ openModal, notificationCount }) => {
  const [showNoti, setShowNoti] = useState(false);

  useEffect(() => {
    if (notificationCount > 0) {
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
      }, 3000);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.bellIconContainer} onPress={openModal}>
      {showNoti && (
        <Text style={styles.textMessage}>You have new notifications</Text>
      )}
      <View>
        <Entypo name="bell" size={30} color="white" />
        {notificationCount > 0 && (
          <View
            style={[styles.notificationBadge, { backgroundColor: "green" }]}
          >
            <Text style={styles.notificationText}>{notificationCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bellIconContainer: {
    position: "absolute",
    flexDirection: "row",
    right: 16,
    top: 15,
  },
  notificationBadge: {
    position: "absolute",
    top: -12,
    right: -12,
    backgroundColor: "red",
    borderRadius: 10,
    width: 23,
    height: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 12,
  },
  notificationMessage: {
    marginRight: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  notificationMessageText: {
    color: "white",
    fontSize: 12,
  },
  textMessage: {
    color: "white",
    marginRight: 5,
    fontSize: 15,
  },
});
