import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../../styles/globalStyles";
import colors from "../../../../styles/colors";
import { NextButton } from "../../../../components/ui/NextButton";
import { FormContext } from "../../../../contexts/FormContext";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export const PersonalInf = () => {
  const { register } = useContext(AuthContext);
  const { formData, setFormData } = useContext(FormContext);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (confirmPassword === formData.password) {
      setPassConfirmation(true);
    } else {
      setPassConfirmation(false);
    }
  }, [confirmPassword, formData.password]);

  const checkFields = () => {
    if (formData?.given_name?.length > 2) {
      if (formData.family_name?.length > 2) {
        if (validateEmail(formData.email)) {
          if (passConfirmation) {
            register();
            navigation.navigate("TransportInfo");
          } else alert("Passwords must match");
        } else alert("Invalid email, please enter a valid email.");
      } else alert("Last Name must have at least 3 caracters");
    } else alert("Name must have at least 3 caracters");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <TextInput
          placeholder="Name"
          keyboardType="ascii-capable"
          textContentType="username"
          inputMode="text"
          style={[globalStyles.input, { marginTop: 15 }]}
          onChangeText={(value) =>
            setFormData({
              ...formData,
              given_name: value,
              role: "transport",
              transportInfo: {},
            })
          }
        />
        <TextInput
          placeholder="Last Name"
          keyboardType="ascii-capable"
          textContentType="username"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) =>
            setFormData({ ...formData, family_name: value })
          }
        />

        <TextInput
          autoCapitalize="none"
          placeholder="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          inputMode="email"
          style={globalStyles.input}
          onChangeText={(value) => setFormData({ ...formData, email: value })}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="password"
            keyboardType="default"
            textContentType="password"
            secureTextEntry={!showPassword}
            inputMode="text"
            style={[globalStyles.input, { paddingRight: 45 }]}
            onChangeText={(value) =>
              setFormData({ ...formData, password: value })
            }
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
        <NextButton toDo={checkFields} />
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
