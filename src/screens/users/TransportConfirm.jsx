import React, { useContext } from "react";
import { Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { GeneralButton } from "../../components/ui/GeneralButton";
import { PostContext } from "../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { AuthContext } from "../../contexts/AuthContext";

export const TransportConfirm = ({ route }) => {
  const { data } = route.params;
  const { state: userState } = useContext(AuthContext);
  const { uptateStatus } = useContext(PostContext);
  const { sendPushNotification } = usePushNotifications();
  const navidation = useNavigation();

  const confirmFuction = (data) => {
    uptateStatus({
      postId: data._id,
      newStatus: { ...data.status, mainStatus: "confirmed" },
    });
    sendPushNotification(
      data?.offerSelected?.owner?.expoPushToken,
      "Service confirmed",
      `${userState?.user?.given_name} has confirmed your service for ${data?.title}`
    );
    navidation.navigate("DriverProfile", {
      transport: data.offerSelected.owner,
      addReview: true,
    });
  };
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
      <GeneralButton
        text="initiate a complaint"
        onPressFunction={() => navidation.navigate("Complaint", { post: data })}
      />
    </View>
  );
};
