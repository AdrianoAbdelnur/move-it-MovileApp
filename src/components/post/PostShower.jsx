import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import { AuthContext } from "../../contexts/AuthContext";

export const PostShower = ({ item, setChatWith }) => {
  const { state: userState } = useContext(AuthContext);
  const navigation = useNavigation();
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
    <TouchableOpacity
      style={[
        styles.itemContainer,
        item.status.mainStatus === "pending"
          ? { backgroundColor: "green" }
          : item.status.mainStatus === "offerSelected"
          ? { backgroundColor: "#455A64" }
          : { backgroundColor: "#444444" },
      ]}
      onPress={() => {
        navigation.navigate("Details", { data: item });
      }}
    >
      {formatDate(item.date.date)}
      <Text style={globalStyles.generalText}>title: {item.title}</Text>
      {item.date.timeDay === "specificTime" ? (
        <Text style={globalStyles.generalInformationText}>
          Date: {fDate} at {fTime}
        </Text>
      ) : (
        <Text style={globalStyles.generalInformationText}>Date: {fDate}</Text>
      )}
      {item.date.timeDay !== "specificTime" && (
        <Text style={globalStyles.generalInformationText}>
          time of day: {item.date.timeDay}
        </Text>
      )}
      <Text style={{ alignSelf: "flex-end", color: "black" }}>
        Press here for more information
      </Text>
      {item.offers.length !== 0 &&
      !item.offerSelected &&
      userState.user === "user" ? (
        <Text style={{ color: "red" }}>
          You have {item.offers.length} offers for this post
        </Text>
      ) : (
        item.offers.find(
          (offer) => offer?.owner?._id === userState?.user?.id
        ) &&
        userState.user.role == "transport" && (
          <Text>You have already offered for this job</Text>
        )
      )}
      {item.status.mainStatus === "offerSelected" && (
        <TouchableOpacity
          style={styles.openChatButton}
          onPress={() => {
            setChatWith(item?.offerSelected?.owner?.given_name);
            navigation.navigate("chat", {
              post: item,
            });
          }}
        >
          <Text style={{ color: "white" }}>
            You have selected {item?.offerSelected?.owner?.given_name}'s offer'
          </Text>
          <Text style={{ color: "white", fontSize: 10, alignSelf: "center" }}>
            press here to chat with him
          </Text>
        </TouchableOpacity>
      )}
      {item.status.mainStatus === "confirmed" && (
        <Text>The transport has been completed</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
