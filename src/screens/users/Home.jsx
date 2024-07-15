import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { PostContext } from "../../contexts/PostsContext";
import { AuthContext } from "../../contexts/AuthContext";
import colors from "../../styles/colors";
import { GeneralButton } from "../../components/ui/GeneralButton";

import { BellNoti } from "../../components/bell/BellNoti";
import { NotiModal } from "../../components/ui/NotiModal";
import { PostShower } from "../../components/post/PostShower";

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
    const notiList = postsState.posts.filter(
      (post) => post.status === "newOffers" || post.status === "transportDone"
    );
    setNotiList(notiList);
    setNotificationCount(notiList.length);
  }, [postsState]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <BellNoti openModal={toggleModal} notificationCount={notificationCount} />
      <GeneralButton
        text={"Publish a transport"}
        onPressFunction={() => navigation.navigate("Type")}
      />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Your Services:</Text>
        <ScrollView style={styles.services}>
          <View>
            {postsState &&
              postsState.posts.map((item) => (
                <PostShower
                  key={item._id}
                  item={item}
                  setChatWith={setChatWith}
                />
              ))}
          </View>
        </ScrollView>
      </View>
      <NotiModal
        modalVisible={modalVisible}
        closeNotiModal={toggleModal}
        notiList={notiList}
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
