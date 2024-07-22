import React, { useContext } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import globalStyles from "../styles/globalStyles";
import colors from "../styles/colors";
import { PostContext } from "../contexts/PostsContext";
import { PostShower } from "../components/post/PostShower";

export const PostsList = ({ setChatWith }) => {
  const { state: postsState } = useContext(PostContext);

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Your Posts:</Text>
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
