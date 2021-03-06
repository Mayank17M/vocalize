import { NavigationContainer } from "@react-navigation/native"; //managing app state
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //transition between screens

import { StatusBar } from "expo-status-bar"; //control app status bar
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AuthScreen from "./screens/AuthScreen";
import RecordingScreen from "./screens/RecordingScreen";
import InsightScreen from "./screens/InsightScreen";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Recording" component={RecordingScreen} />
            <Stack.Screen name="Insight" component={InsightScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Web3ReactProvider>
    </>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
