import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";

const CountdownTimer = ({ expiredTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const targetTime = new Date(expiredTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        setTimeLeft(0);
        if (onExpire) onExpire();
        clearInterval(timer);
      } else {
        setTimeLeft(distance);
      }
    };

    const timer = setInterval(updateTimer, 1000);

    updateTimer();

    return () => clearInterval(timer);
  }, [expiredTime]);

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const lessThanOneMinute = timeLeft < 60000;

  return (
    <View>
      <Text
        style={[
          globalStyles.generalText,
          lessThanOneMinute && { color: "red" },
        ]}
      >{`${hours}h ${minutes}m ${seconds}s`}</Text>
    </View>
  );
};

export default CountdownTimer;
