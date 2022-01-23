import React from "react";
import { Button, Text, Alert } from "react-native";

const AuthScreen = ({ navigation }) => {
  return (
    <>
      <Button
        title="Connect with Metamask"
        className="enableMetamaskButton"
        onPress={() => {
          if (typeof window.ethereum !== "undefined") {
            console.log("MetaMask is installed!");
            const accounts = ethereum.request({
              method: "eth_requestAccounts",
            });
            const account = accounts[0];
            Alert.alert(accounts);
          }
          //Will Start the metamask extension
        }}
      />
      <Text>Account: </Text>
      <Button
        title="Go to Recording Screen"
        onPress={() => navigation.navigate("Recording", { name: "Joe" })}
      />
    </>
  );
};

export default AuthScreen;  