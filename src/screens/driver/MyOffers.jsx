import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import colors from "../../styles/colors";
import { PostContext } from "../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";

export const MyOffers = ({ setChatWith }) => {
  const { state: postState, uptateStatus } = useContext(PostContext);
  const navigation = useNavigation();
  const [mySelectedOffers, setMySelectedOffers] = useState([]);

  useEffect(() => {
    setMySelectedOffers(
      postState?.posts?.filter((post) => post?.offerSelected?._id)
    );
  }, []);

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
            {mySelectedOffers.length !== 0 &&
              mySelectedOffers.map((item, index) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.itemContainer}
                  onPress={() =>
                    navigation.navigate("Maps", {
                      directions: item.directions,
                    })
                  }
                >
                  {formatDate(item.date.date)}
                  <Text style={globalStyles.generalText}>
                    title: {item.title}
                  </Text>
                  {item.date.timeDay === "specificTime" ? (
                    <Text style={globalStyles.generalInformationText}>
                      Date: {fDate} at {fTime}
                    </Text>
                  ) : (
                    <Text style={globalStyles.generalInformationText}>
                      Date: {fDate}
                    </Text>
                  )}
                  {item.date.timeDay !== "specificTime" && (
                    <Text style={globalStyles.generalInformationText}>
                      time of day: {item.date.timeDay}
                    </Text>
                  )}
                  <Text style={globalStyles.generalText}>
                    Price: {item.offerSelected.price}
                  </Text>
                  <TouchableOpacity
                    style={styles.openChatButton}
                    onPress={() => {
                      setChatWith(item.owner.given_name);
                      navigation.navigate("chat", {
                        post: item,
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      Your offer has been selected by {item.owner.given_name}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        alignSelf: "center",
                      }}
                    >
                      press here to chat with him
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.done}
                    onPress={() => {
                      uptateStatus({
                        postId: item._id,
                        newStatus: {
                          ...item.status,
                          mainStatus: "transportDone",
                        },
                      });
                    }}
                  >
                    <Text style={{ alignSelf: "flex-end", color: "black" }}>
                      Press here if the job has been completed
                    </Text>
                  </TouchableOpacity>
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
    maxHeight: "95%",
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
