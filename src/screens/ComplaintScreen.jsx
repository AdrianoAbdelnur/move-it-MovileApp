import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import colors from "../styles/colors";
import { GeneralButton } from "../components/ui/GeneralButton";
import { PostContext } from "../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { AuthContext } from "../contexts/AuthContext";

export const ComplaintScreen = ({ route }) => {
  const { post } = route.params;
  const [complaintText, setComplaintText] = useState("");
  const {
    state: postState,
    addComplaint,
    clearAlertMsg,
  } = useContext(PostContext);
  const { state: userState } = useContext(AuthContext);
  const navigation = useNavigation();
  const { sendPushNotification } = usePushNotifications();

  useEffect(() => {
    if (postState.alertMsg !== "") {
      Alert.alert("Complaint", postState.alertMsg, [
        {
          text: "OK",
          onPress: () => {
            clearAlertMsg();
            navigation.navigate("home");
          },
        },
      ]);
    }
  }, [postState.alertMsg]);

  const sendComplaint = () => {
    addComplaint({ postId: post._id, complaintText });
    sendPushNotification(
      post?.offerSelected.owner.expoPushToken,
      "Complaint Initiated",
      `${userState?.user?.given_name} has initiated a complaint for a ${post.title}`
    );
  };
  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalText}>
          Please explain your complaint to us.:
        </Text>
        <Text style={[globalStyles.generalInformationText]}>
          (We are truly sorry that the service did not meet your expectations.
          Please explain what happened, and we will assist you.).
        </Text>
        <TextInput
          style={styles.multilineInput}
          multiline
          numberOfLines={4}
          placeholder="Please explain the issue in as much detail as possible."
          onChangeText={(value) => setComplaintText(value)}
        />
        <GeneralButton
          text="Send Complaint"
          onPressFunction={() => sendComplaint()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  multilineInput: {
    width: "100%",
    borderColor: colors.border,
    height: 200,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    color: colors.textPrimary,
    textAlignVertical: "top",
  },
  scrollViewContainer: {
    backgroundColor: colors.background,
    paddingTop: 15,
  },
});
