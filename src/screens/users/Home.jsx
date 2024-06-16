import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import { PostContext } from "../../contexts/PostsContext";
import { AuthContext } from "../../contexts/AuthContext";
import colors from "../../styles/colors";
import { GeneralButton } from "../../components/ui/GeneralButton";

export const Home = () => {
  const navigation = useNavigation();
  const { state: userState } = useContext(AuthContext);
  const { state: postsState, getMyPosts } = useContext(PostContext);
  /* const { formatDate, fDate, fTime } = useFormatDate(); */
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

  useEffect(() => {
    if (postsState.posts.length === 0) {
      getMyPosts(userState.user.id);
    }
  }, []);

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <GeneralButton
        text={"Publish a transport"}
        onPressFunction={() => navigation.navigate("Type")}
      />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Your Services:</Text>
        <ScrollView style={styles.services}>
          <View>
            {postsState &&
              postsState.posts.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.itemContainer,
                    item.status === "Pending"
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "#37474F" },
                  ]}
                  onPress={() => {
                    navigation.navigate("Details", { data: item });
                  }}
                >
                  {formatDate(item.date)}
                  <Text style={globalStyles.generalText}>
                    Type of goods: {item.goodsType}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    from: {item.directions?.from?.description}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    to: {item.directions?.to?.description}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    Date: {fDate} at {fTime}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    status: {item.status}
                  </Text>
                  <Text style={{ alignSelf: "flex-end", color: "black" }}>
                    Press here for more information
                  </Text>
                </TouchableOpacity>
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
  itemContainer: {
    backgroundColor: "#37474F",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 8,
    margin: 2,
    padding: 3,
  },
});
