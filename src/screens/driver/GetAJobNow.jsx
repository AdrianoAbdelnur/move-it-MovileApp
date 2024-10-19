import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { PostContext } from "../../contexts/PostsContext";
import { PostShower } from "../../components/post/PostShower";
import colors from "../../styles/colors";
import { DropDownCustom } from "../../components/dropDown/DropDownCustom";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { MapButton } from "../../components/ui/MapButton";

const items = [
  { label: "1 km", value: 1 },
  { label: "5 km", value: 5 },
  { label: "10 km", value: 10 },
  { label: "20 km", value: 20 },
  { label: "Any distante", value: "any" },
];

export const GetAJobNow = () => {
  const { state: postState } = useContext(PostContext);
  const { state: userState } = useContext(AuthContext);
  const [nowPosts, setNowPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [maxDistance, setMaxDistance] = useState("any");
  const navigation = useNavigation();

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      setUserLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getCurrentTimeDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Afternoon";
    } else if (currentHour >= 18 && currentHour < 22) {
      return "Evening";
    } else {
      return null;
    }
  };

  useEffect(() => {
    const currentTimeDay = getCurrentTimeDay();
    setNowPosts(
      postState?.posts?.filter((post) => {
        return (
          isToday(post?.date?.date) &&
          (post?.date?.timeDay === "now" ||
            post?.date?.timeDay === "At Any Time" ||
            post?.date?.timeDay === currentTimeDay) &&
          post?.status?.mainStatus === "pending" &&
          !offeredPost(post)
        );
      })
    );

    setFilteredPosts(
      postState?.posts?.filter((post) => {
        return (
          isToday(post?.date?.date) &&
          (post?.date?.timeDay === "now" ||
            post?.date?.timeDay === "At Any Time" ||
            post?.date?.timeDay === currentTimeDay) &&
          post?.status?.mainStatus === "pending" &&
          !offeredPost(post)
        );
      })
    );
  }, [postState]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        (1 - Math.cos(dLon))) /
        2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const filterPostsByDistance = async (maxDistance) => {
    setMaxDistance(maxDistance);
    if (maxDistance === "any") {
      setFilteredPosts(nowPosts);
    } else {
      const filteredPosts = nowPosts.filter((post) => {
        const distance = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          post.directions[0].location.latitude,
          post.directions[0].location.longitude
        );
        return distance < maxDistance;
      });

      setFilteredPosts(filteredPosts);
    }
  };

  const offeredPost = (post) => {
    const offered = post.offers.find(
      (offer) =>
        offer.owner._id === userState.user.id && offer.status !== "expired"
    );
    if (offered) {
      return true;
    }
    return false;
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <DropDownCustom
        items={items}
        placeholder="Select a distance"
        onSelect={(value) => filterPostsByDistance(value.value)}
      />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Available services:</Text>
        <ScrollView style={styles.services}>
          <View>
            {filteredPosts?.length > 0 ? (
              filteredPosts?.map((item) => (
                <PostShower key={item._id} item={item} />
              ))
            ) : (
              <Text style={{ margin: 10 }}> There are no posts to display</Text>
            )}
          </View>
        </ScrollView>
      </View>
      <MapButton
        onPressFunction={() =>
          navigation.navigate("JobsMaps", {
            userLocation,
            postsToShow: nowPosts,
            maxDistance,
          })
        }
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
    maxHeight: "70%",
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
  openChatButton: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 12,
  },
  done: {
    backgroundColor: "grey",
  },
});
