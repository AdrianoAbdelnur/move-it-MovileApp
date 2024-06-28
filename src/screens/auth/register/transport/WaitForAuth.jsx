import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../../../../styles/globalStyles";

export const WaitForAuth = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.generalInformationText}>
        Congratulations! You've completed your information. Please allow up to
        24 hours for us to review it before you can start earning money with our
        app.
      </Text>
    </View>
  );
};
