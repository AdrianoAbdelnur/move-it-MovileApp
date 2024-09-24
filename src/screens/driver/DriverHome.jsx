import React, { useContext, useEffect, useState } from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { StatusBar } from "expo-status-bar";
import colors from "../../styles/colors";
import { PostContext } from "../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";
import { PostShower } from "../../components/post/PostShower";
import { AuthContext } from "../../contexts/AuthContext";
import { BellNoti } from "../../components/bell/BellNoti";
import { NotiModal } from "../../components/ui/NotiModal";
import { GeneralButton } from "../../components/ui/GeneralButton";
import * as Location from "expo-location";

export const DriverHome = ({ setChatWith }) => {
  const navigation = useNavigation();
  const {
    state: postsState,
    getPendingPosts,
    checkExpiredPost,
  } = useContext(PostContext);
  const { state: userState } = useContext(AuthContext);
  const [pendingPost, setPendingPost] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notiList, setNotiList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (postsState.posts.length === 0) {
      getPendingPosts(userState.user.id);
    }
  }, []);

  useEffect(() => {
    checkExpiredPost(postsState.posts);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (postsState.posts.length !== 0) {
      const pendings = postsState.posts.filter(
        (post) =>
          post.status.mainStatus === "pending" &&
          !post.transportCancel.find(
            (cancel) => cancel._id === userState.user.id
          )
      );
      setPendingPost(pendings);
    }
    const newsNotiList = postsState.posts.flatMap((post) => {
      const notifications = [];
      if (post.status.messagesStatus.newUserMessage === true) {
        notifications.push({ type: "newMessage", post });
      }
      if (
        post.status.offerAcepted === true &&
        post.status.mainStatus !== "expired" &&
        post.status.mainStatus !== "cancelled"
      ) {
        notifications.push({ type: "offerAcepted", post });
      }
      if (post.status.newComplaint) {
        notifications.push({ type: "complaint", post });
      }
      if (
        post.status.offerSelected &&
        new Date(post?.date?.date) < currentDate
      ) {
        notifications.push({ type: "OfferSelectedExpired", post });
      }

      return notifications;
    });
    setNotiList(newsNotiList);

    getUserLocation();
  }, [postsState]);

  useEffect(() => {
    setNotificationCount(notiList?.length);
  }, [notiList]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude: yourLatitude, longitude: yourLongitude } = coords;
    setUserLocation({ latitude: yourLatitude, longitude: yourLongitude });
  };
  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <BellNoti openModal={toggleModal} notificationCount={notificationCount} />
      <View style={{ marginTop: 25 }}>
        <GeneralButton
          text="My accepted offers"
          onPressFunction={() => navigation.navigate("MyOffers")}
        />
        <GeneralButton
          text="Get a job now"
          onPressFunction={() => navigation.navigate("JobNow")}
        />
      </View>
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
      <Text
        onPress={() => {
          navigation.navigate("JobsMaps", {
            userLocation,
            postsToShow: pendingPost,
          });
        }}
      >
        View in map
      </Text>
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
    fontSize: 15,
    margin: 10,
  },
  services_container: {
    width: "90%",
    maxHeight: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
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
    height: "70%",
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
