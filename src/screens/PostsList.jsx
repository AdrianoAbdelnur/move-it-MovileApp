import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import globalStyles from "../styles/globalStyles";
import colors from "../styles/colors";
import { PostContext } from "../contexts/PostsContext";
import { PostShower } from "../components/post/PostShower";
import { DropDownCustom } from "../components/dropDown/DropDownCustom";

const statusOrder = {
  complaint: 0,
  transportDone: 1,
  inProgress: 2,
  expired: 3,
  offerSelected: 4,
  pending: 5,
  confirmed: 6,
  cancelled: 7,
};

const items = [
  { label: "Pending", value: "pending" },
  { label: "Offer selected", value: "offerSelected" },
  { label: "Expired", value: "expired" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "With complaint", value: "complaint" },
];

export const PostsList = ({ setChatWith }) => {
  const { state: postsState } = useContext(PostContext);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [postStatus, setPostStatus] = useState([
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Offer selected",
      value: "offerSelected",
    },
  ]);

  useEffect(() => {
    const selectedStatuses = postStatus.map((item) => item.value);

    let sorted = [...postsState.posts];
    sorted = sorted?.filter((post) =>
      selectedStatuses.includes(post.status.mainStatus)
    );

    sorted = sorted?.sort((a, b) => {
      const statusA = a.status.mainStatus;
      const statusB = b.status.mainStatus;

      return statusOrder[statusA] - statusOrder[statusB];
    });
    setSortedPosts(sorted);
  }, [postsState, postStatus]);

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Your Posts:</Text>
        <Text style={{ alignSelf: "flex-start", marginHorizontal: 5 }}>
          Filter by status
        </Text>
        <DropDownCustom
          items={items}
          prevItem={postStatus}
          onSelect={(selectedItems) => setPostStatus(selectedItems)}
          multiSelection={true}
          placeholder="Select status"
        />
        <ScrollView style={styles.services}>
          <View>
            {postStatus.length == 0 ? (
              <Text style={{ margin: 10 }}>Please select an status option</Text>
            ) : sortedPosts.length > 0 ? (
              sortedPosts.map((item) => (
                <PostShower
                  key={item._id}
                  item={item}
                  setChatWith={setChatWith}
                />
              ))
            ) : (
              <Text style={{ margin: 10 }}> There are no posts to display</Text>
            )}
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
    width: "95%",
    maxHeight: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  servicesTitle: {
    color: "black",
    fontSize: 25,
    alignSelf: "flex-start",
    margin: 5,
  },
  services: {
    width: "95%",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontSize: 25,
    marginBottom: 5,
  },
});
