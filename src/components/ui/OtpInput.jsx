import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OtpInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text.replace(/[^0-9A-Za-z]/g, "");
    setOtp(updatedOtp);
    onChange(updatedOtp.join(""));
    if (text && index < length - 1) {
      this[`input_${index + 1}`].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      this[`input_${index - 1}`].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          ref={(input) => {
            this[`input_${index}`] = input;
          }}
          style={styles.input}
          maxLength={1}
          keyboardType="default"
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          value={otp[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    color: "white",
  },
});

export default OtpInput;
