import React, { useContext, useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { FormUserContext } from "../../../contexts/FormUserContext";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { NextButton } from "../../../components/ui/NextButton";

export const DateSelect = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("Empty");
  const navigation = useNavigation();
  const { formatDate, fDate, fTime } = useFormatDate();
  const { formData, setFormData } = useContext(FormUserContext);

  useEffect(() => {
    setInfo(fDate + " at " + fTime);
  }, [fDate, fTime]);

  const onChange = (e, selectedDate) => {
    console.log(selectedDate);
    setDate(selectedDate);
    setShow(false);
    formatDate(selectedDate);

    setFormData({
      ...formData,
      date: selectedDate,
    });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const amPmFunction = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.generalInformationText}>Select the date</Text>
      <GeneralButton
        text={"Select the date"}
        onPressFunction={() => showMode("date")}
      />
      <GeneralButton
        text={"Select the time"}
        onPressFunction={() => showMode("time")}
      />
      <Text style={globalStyles.generalInformationText}>
        Date for your transport: {"\n"} {info}
      </Text>
      <NextButton navigateTo={"Directions"} />
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          minuteInterval={5}
          minimumDate={new Date()}
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
