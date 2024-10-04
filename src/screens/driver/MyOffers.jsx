import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import colors from "../../styles/colors";
import { PostContext } from "../../contexts/PostsContext";
import { PostShower } from "../../components/post/PostShower";

const statusOrder = {
  inProgress: 0,
  offerSelected: 1,
  transportDone: 2,
  confirmed: 3,
  cancelled: 4,
  expired: 5,
  complaint: 6,
};

export const MyOffers = ({ setChatWith }) => {
  const { state: postState } = useContext(PostContext);
  const [mySelectedOffers, setMySelectedOffers] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    setMySelectedOffers(
      postState?.posts?.filter((post) => {
        return post?.offerSelected?._id;
      })
    );
  }, [postState]);

  useEffect(() => {
    setSortedPosts(
      mySelectedOffers?.sort((a, b) => {
        const statusA = a.status.mainStatus;
        const statusB = b.status.mainStatus;

        return statusOrder[statusA] - statusOrder[statusB];
      })
    );
  }, [mySelectedOffers]);

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

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Accepted services:</Text>
        <ScrollView style={styles.services}>
          <View>
            {sortedPosts?.length !== 0 &&
              sortedPosts?.map((item) => (
                <PostShower
                  key={item._id}
                  item={item}
                  setChatWith={setChatWith}
                />
              ))}
          </View>
        </ScrollView>
      </View>
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
    maxHeight: "95%",
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
