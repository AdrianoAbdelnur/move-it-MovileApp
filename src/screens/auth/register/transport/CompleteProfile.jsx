import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../../../../styles/globalStyles";
import { NextButton } from "../../../../components/ui/NextButton";

export const CompleteProfile = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.generalInformationText}>
        Please complete your profile to start earning money. To do this, you
        will need to take some photos, such as those of your vehicle or driver's
        license. Therefore, we recommend that you be near these items. Once
        you're ready, we can get started
      </Text>
      <NextButton navigateTo={"TransportInfo"} />
    </View>
  );
};
