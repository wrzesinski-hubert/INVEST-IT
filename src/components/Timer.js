import { HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  const [enterTime, setEnterTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((previousValue) => previousValue + 1);
    }, 1000);

    setEnterTime(new Date().toTimeString());

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <VStack gap="10px" align="left">
      <HStack>
        <Text fontWeight="bold">Seconds spend on page:</Text>
        <p>{`${seconds} s`}</p>
      </HStack>
      <HStack>
        <Text fontWeight="bold">Time of entering the website:</Text>
        <p>{enterTime}</p>
      </HStack>
    </VStack>
  );
};

export default Timer;
