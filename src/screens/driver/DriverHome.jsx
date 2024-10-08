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
import { FilterPostsModal } from "../../components/ui/FilterPostsModal";

export const DriverHome = ({ setChatWith }) => {
  const navigation = useNavigation();
  const {
    state: postsTState,
    getPendingPosts,
    checkExpiredPost,
  } = useContext(PostContext);
  const { state: userState } = useContext(AuthContext);
  const [pendingPost, setPendingPost] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notiList, setNotiList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [centerLocation, setCenterLocation] = useState("any");
  const [maxDistance, setMaxDistance] = useState({
    label: "any distance",
    value: "any",
  });

  useEffect(() => {
    if (postsTState.posts.length === 0) {
      getPendingPosts(userState.user.id);
    }
  }, []);

  useEffect(() => {
    checkExpiredPost(postsTState.posts);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (postsTState.posts.length !== 0) {
      const pendings = postsTState.posts.filter(
        (post) =>
          post.status.mainStatus === "pending" &&
          !post.transportCancel.find(
            (cancel) => cancel._id === userState.user.id
          )
      );
      setPendingPost(pendings);
      setFilteredPosts(pendings);
    }
    const newsNotiList = postsTState.posts.flatMap((post) => {
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
  }, [postsTState]);

  useEffect(() => {
    setNotificationCount(notiList?.length);
  }, [notiList]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude: yourLatitude, longitude: yourLongitude } = coords;

      setUserLocation({ latitude: yourLatitude, longitude: yourLongitude });
    } catch (error) {
      console.error("An error occurred while trying to get location:", error);
    }
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
        <Text
          onPress={() => setShowFilter(true)}
          style={{
            alignSelf: "flex-end",
            marginHorizontal: 20,
            textDecorationLine: "underline",
            color: "blue",
          }}
        >
          Filter
        </Text>
        <ScrollView style={styles.services}>
          <View>
            {filteredPosts &&
              filteredPosts.map((item, index) => (
                <PostShower key={item._id} item={item} />
              ))}
          </View>
        </ScrollView>
      </View>
      <Text
        onPress={() => {
          navigation.navigate("JobsMaps", {
            userLocation:
              centerLocation !== "any" ? centerLocation : userLocation,
            postsToShow: pendingPost,
            maxDistance: maxDistance.value,
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
      <FilterPostsModal
        showModal={showFilter}
        setShowModal={setShowFilter}
        posts={pendingPost}
        setFilteredPosts={setFilteredPosts}
        centerLocation={centerLocation}
        setCenterLocation={setCenterLocation}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
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
    height: "60%",
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
