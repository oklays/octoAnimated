import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import * as Font from "expo-font";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { AppLoading } from "expo";

const Stack = createStackNavigator();

const loadFont = () => {
  return Font.loadAsync({
    NunitoBlack: require("assets/fonts/Nunito-Black.ttf"),
    NunitoBold: require("assets/fonts/Nunito-Bold.ttf"),
    NunitoRegular: require("assets/fonts/Nunito-Regular.ttf"),
    NunitoSemibold: require("assets/fonts/Nunito-SemiBold.ttf"),
  });
};

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!isLoadingComplete || !dataLoaded) {
    return (
      <AppLoading startAsync={loadFont} onFinish={() => setDataLoaded(true)} />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
