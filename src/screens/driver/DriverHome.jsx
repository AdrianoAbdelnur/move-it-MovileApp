import React, { useContext, useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import { StatusBar } from "expo-status-bar";
import colors from "../../styles/colors";
import { PostContext } from "../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";
import { PostShower } from "../../components/post/PostShower";
import { AuthContext } from "../../contexts/AuthContext";
import { BellNoti } from "../../components/bell/BellNoti";
import { NotiModal } from "../../components/ui/NotiModal";

export const DriverHome = ({ setChatWith }) => {
  const navigation = useNavigation();
  const { state: postsState, getPendingPosts } = useContext(PostContext);
  const { state: userState } = useContext(AuthContext);
  const [pendingPost, setPendingPost] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notiList, setNotiList] = useState([]);

  useEffect(() => {
    if (postsState.posts.length === 0) {
      getPendingPosts(userState.user.id);
    }
  }, []);

  useEffect(() => {
    if (postsState.posts.length !== 0) {
      const pendings = postsState.posts.filter(
        (post) => post.status.mainStatus === "pending"
      );
      setPendingPost(pendings);
    }
    const newsNotiList = postsState.posts.flatMap((post) => {
      const notifications = [];
      if (post.status.messagesStatus.newUserMessage === true) {
        notifications.push({ type: "newMessage", post });
      }

      return notifications;
    });
    setNotiList(newsNotiList);
  }, [postsState]);

  useEffect(() => {
    setNotificationCount(notiList?.length);
  }, [notiList]);

  let fDate = "";
  let fTime = "";

  const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    fDate = `${day}/${month}/${year}`;
    fTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <BellNoti openModal={toggleModal} notificationCount={notificationCount} />
      <TouchableOpacity
        style={globalStyles.OptionsButton}
        onPress={() => navigation.navigate("MyOffers")}
      >
        <Text style={styles.buttonText}>See my accepted offers</Text>
      </TouchableOpacity>
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Requested services:</Text>
        <ScrollView style={styles.services}>
          <View>
            {pendingPost &&
              pendingPost.map((item, index) => (
                <PostShower key={item._id} item={item} />
              ))}
          </View>
        </ScrollView>
      </View>
      <NotiModal
        modalVisible={modalVisible}
        closeNotiModal={toggleModal}
        notiList={notiList}
        setChatWith={setChatWith}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 25,
    margin: 10,
  },
  services_container: {
    width: "90%",
    maxHeight: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 15,
  },
  servicesTitle: {
    color: "black",
    fontSize: 25,
    alignSelf: "flex-start",
    margin: 5,
  },
  services: {
    width: "85%",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.primary,
  },
  text: {
    color: "black",
    fontSize: 25,
    marginBottom: 5,
  },
  itemContainer: {
    backgroundColor: "#37474F",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 8,
    margin: 2,
    padding: 3,
  },
});
