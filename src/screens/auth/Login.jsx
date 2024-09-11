import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import globalStyles from "../../styles/globalStyles";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomModal } from "../../components/ui/CustomModal";

export const Login = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const { formState, getInput } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    login(formState?.email, formState?.password);
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Image
          source={require("./../../assetsApp/callacar.jpeg")}
          style={styles.image}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="email"
          keyboardType="email-address"
          textContentType="username"
          inputMode="email"
          style={globalStyles.input}
          onChangeText={(value) => getInput("email", value)}
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
            onChangeText={(value) => getInput("password", value)}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.otherOptionsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("EnterMail")}>
              <Text style={styles.buttonText}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SelectRegister")}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomModal />
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
    marginBottom: 15,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  image: {
    width: 150,
    height: 180,
    marginBottom: 20,
  },
});
