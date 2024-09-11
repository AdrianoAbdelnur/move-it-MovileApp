import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../styles/colors";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { AuthContext } from "../../../contexts/AuthContext";

export const NewPass = ({ route }) => {
  const { email, otp: verificationCode } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updatePass } = useContext(AuthContext);

  useEffect(() => {
    if (confirmPassword === password) {
      setPassConfirmation(true);
    } else {
      setPassConfirmation(false);
    }
  }, [confirmPassword, password]);

  const checkFields = () => {
    if (passConfirmation) {
      console.log("PASSWORD", password);
      updatePass(email, verificationCode, password);
    } else alert("Passwords must match");
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalText}>
          Please enter the new password for the email {email}
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="password"
            keyboardType="default"
            textContentType="password"
            secureTextEntry={!showPassword}
            inputMode="text"
            style={[globalStyles.input, { paddingRight: 45 }]}
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="confirm password"
            keyboardType="default"
            textContentType="password"
            secureTextEntry={!showConfirmPassword}
            inputMode="text"
            style={[globalStyles.input, { paddingRight: 45 }]}
            onChangeText={(value) => {
              setConfirmPassword(value);
            }}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialIcons
              name={showConfirmPassword ? "visibility" : "visibility-off"}
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <GeneralButton text="confirm" onPressFunction={() => checkFields()} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: "85%",
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  otherOptionsContainer: {
    width: "100%",
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
});
