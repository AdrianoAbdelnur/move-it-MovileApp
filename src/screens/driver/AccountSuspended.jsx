import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";

export const AccountSuspended = ({ route }) => {
  const { reason, suspensionEndDate } = route.params;

  const differenceInMillis = new Date(suspensionEndDate) - new Date();

  const daysRemaining = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.generalText}>
        Your account has been suspended. It will be restored in {daysRemaining}{" "}
        days.
      </Text>
      {reason && <Text style={globalStyles.generalText}>Reason: {reason}</Text>}
    </View>
  );
};
