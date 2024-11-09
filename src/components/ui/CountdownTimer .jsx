import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";

const CountdownTimer = ({ expiredTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    const targetTime = new Date(expiredTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        // Evita cambiar el estado si ya ha expirado
        if (!hasExpired) {
          setTimeLeft(0);
          setHasExpired(true);
          if (onExpire) onExpire();
        }
        clearInterval(timer);
      } else {
        setTimeLeft(distance);
      }
    };

    const timer = setInterval(updateTimer, 1000);

    // Llamada inicial para sincronizar el temporizador
    updateTimer();

    return () => clearInterval(timer);
  }, [expiredTime]); // Solo depende de expiredTime

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
