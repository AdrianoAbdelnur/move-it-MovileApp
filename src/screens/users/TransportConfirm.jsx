import React, { useContext } from "react";
import { Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { GeneralButton } from "../../components/ui/GeneralButton";
import { PostContext } from "../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";

export const TransportConfirm = ({ route }) => {
  const { data } = route.params;
  const { uptateStatus } = useContext(PostContext);
  const navidation = useNavigation();

  const confirmFuction = (data) => {
    uptateStatus({ postId: data._id, newStatus: "TransportConfirmed" });
    navidation.navigate("Reviews", {
      transport: data.offerSelected.owner,
      addReview: true,
    });
  };
  console.log("AUU", data);
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.generalText}>
        Do you confirm that the transport has been completed correctly?
      </Text>
      <GeneralButton
        text="Confirm"
        onPressFunction={() => confirmFuction(data)}
      />
      <Text style={globalStyles.generalText}>
        I am not satisfied with the work, initiate a complaint.
      </Text>
      <GeneralButton text="initiate a complaint" onPressFunction={() => {}} />
    </View>
  );
};
