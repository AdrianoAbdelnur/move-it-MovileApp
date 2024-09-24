import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import { AuthContext } from "../../contexts/AuthContext";
import { clientAxios } from "../../api/ClientAxios";
import CountdownTimer from "../ui/CountdownTimer ";
import { PostContext } from "../../contexts/PostsContext";

const statusColors = {
  pending: "#388E3C",
  offerSelected: "#3F51B5",
  inProgress: "#FF9800",
  transportConfirmed: "#4CAF50",
  confirmed: "#003300",
  expired: "#F44336",
  cancelled: "#6C757D",
  transportDone: "blue",
  complaint: "#222222",
};

export const PostShower = ({ item, setChatWith }) => {
  const { state: userState } = useContext(AuthContext);
  const { modifyOfferInPost } = useContext(PostContext);
  const cardColor = statusColors[item.status.mainStatus];
  const [myActiveOffer, setMyActiveOffer] = useState(false);
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

  useEffect(() => {
    const offerChecked = checkOffer();
    setMyActiveOffer(offerChecked);
  }, [item]);

  const checkOffer = () => {
    const myOfferFound = item.offers.find((offer) => {
      return (
        offer?.owner?._id === userState?.user?.id && offer.status === "Pending"
      );
    });
    if (myOfferFound) {
      const now = new Date().getTime();
      if (new Date(myOfferFound?.expiredTime).getTime() < now) {
        updateOfferStatus(myOfferFound._id);
        return false;
      } else return myOfferFound;
    } else return false;
  };

  const updateOfferStatus = async (id) => {
    try {
      const { data } = await clientAxios.patch("/offer/modifyStatus", {
        offerId: id,
        newStatus: "expired",
      });
      const { updatedOffers: newOffer } = data;
      modifyOfferInPost({
        ownerId: userState.user.id,
        ownerName: userState.user.given_name,
        postId: newOffer.post,
        newOfferId: newOffer._id,
        expiredTime: newOffer.expiredTime,
        status: newOffer.status,
        price: newOffer.price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: cardColor }]}
      onPress={() => {
        navigation.navigate("Details", { data: item });
      }}
    >
      {formatDate(item?.date?.date)}
      <Text style={globalStyles.generalText}>title: {item.title}</Text>
      {item?.date?.timeDay === "specificTime" ? (
        <Text style={globalStyles.generalInformationText}>
          Date: {fDate} at {fTime}
        </Text>
      ) : (
        <Text style={globalStyles.generalInformationText}>Date: {fDate}</Text>
      )}
      {item?.date?.timeDay !== "specificTime" && (
        <Text style={globalStyles.generalInformationText}>
          time of day: {item?.date?.timeDay}
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
        myActiveOffer &&
        userState?.user?.role == "transport" && (
          <View>
            <Text>
              You have already made an offer for this job, and your offer was{" "}
              {myActiveOffer?.price} AUD
            </Text>
            <View style={styles.expireContainer}>
              <Text style={[globalStyles.generalText, { marginRight: 5 }]}>
                Expire in:
              </Text>
              <CountdownTimer
                expiredTime={myActiveOffer.expiredTime}
                onExpire={() => setMyActiveOffer(checkOffer())}
              />
            </View>
          </View>
        )
      )}
      {userState?.user?.role === "user" &&
        (item.status.mainStatus === "offerSelected" ||
          item.status.mainStatus === "inProgress") && (
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
              You have selected {item?.offerSelected?.owner?.given_name}'s
              offer'
            </Text>
            <Text style={{ color: "white", fontSize: 10, alignSelf: "center" }}>
              press here to chat with him
            </Text>
          </TouchableOpacity>
        )}
      {userState?.user?.role === "transport" &&
        (item.status.mainStatus === "offerSelected" ||
          item.status.mainStatus === "inProgress") && (
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
        )}
      {item.status.mainStatus === "confirmed" && (
        <Text>The transport has been completed</Text>
      )}
      {item.status.mainStatus === "transportDone" && (
        <Text>Waiting for user confirmation</Text>
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
  expireContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
