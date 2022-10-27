import Paho from "paho-mqtt"
import React from 'react';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { WasherCardComponent } from '../components/WasherCard';
import { useState, useEffect, setIte } from 'react';

client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  `washer-${parseInt(Math.random() * 100)}`
);

export function HomeScreen({ navigation }) {

  const [value, setValue] = useState("off");

  function onMessage(message) {
    if (message.destinationName === "washer/value")
      console.log("received");
    setValue(message.payloadString);
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("washer/value");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });
  }, [])

  return (
    <View style={style.container}>
      <Text>Washers</Text>
      <Text>on/off value: {value}</Text>
      <Button mode="contained"
        onPress={() => navigation.openDrawer()}>
        Press Me
      </Button>
      <WasherCardComponent />
      <WasherCardComponent />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});