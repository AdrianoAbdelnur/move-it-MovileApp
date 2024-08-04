import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { PostContext } from "../../contexts/PostsContext";
import { AuthContext } from "../../contexts/AuthContext";
import colors from "../../styles/colors";
import { GeneralButton } from "../../components/ui/GeneralButton";

import { BellNoti } from "../../components/bell/BellNoti";
import { NotiModal } from "../../components/ui/NotiModal";

export const Home = ({ setChatWith }) => {
  const navigation = useNavigation();
  const { state: userState } = useContext(AuthContext);
  const { state: postsState, getMyPosts } = useContext(PostContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notiList, setNotiList] = useState([]);

  useEffect(() => {
    if (postsState.posts.length === 0) {
      getMyPosts(userState.user.id);
    }
  }, []);

  useEffect(() => {
    const newsNotiList = postsState.posts.flatMap((post) => {
      const notifications = [];
      if (post.status.newOffers === true) {
        notifications.push({ type: "newOffer", post });
      }
      if (post.status.mainStatus === "transportDone") {
        notifications.push({ type: "transportDone", post });
      }
      if (post.status.messagesStatus.newTransportMessage === true) {
        notifications.push({ type: "newMessage", post });
      }

      return notifications;
    });
    setNotiList(newsNotiList);
  }, [postsState]);

  useEffect(() => {
    setNotificationCount(notiList?.length);
  }, [notiList]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <BellNoti openModal={toggleModal} notificationCount={notificationCount} />
      <GeneralButton
        text={"Post a transport"}
        onPressFunction={() => navigation.navigate("Title")}
        icon="add-to-list"
      />
      <GeneralButton
        text={"Your posts"}
        onPressFunction={() => navigation.navigate("PostsList")}
        icon="text-document"
      />
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
});
