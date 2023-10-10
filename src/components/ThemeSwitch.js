import React from "react";
import { Switch, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../reducers/app";

const ThemeSwitch = () => {
  const isDarkMode = useSelector((state) => state.app.isDarkMode);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(changeTheme());
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  return (
    <VStack>
      <p>Dark theme</p>
      <Switch
        colorScheme="teal"
        size="lg"
        onChange={() => toggleTheme()}
        isChecked={isDarkMode}
      />
    </VStack>
  );
};

export default ThemeSwitch;
