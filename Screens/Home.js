import Paho from "paho-mqtt";
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { useState,useEffect } from "react";

client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

export function HomeScreen({ navigation }) {

  const [value, setValue] = useState(0);

  function onMessage(message){
    if(message.destinationName === "mqtt-async-test/value")
      console.log("received");
      setValue(parseInt(message.payloadString));
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("mqtt-async-test/value");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });
  }, [])

  function changeValue(c){
    const message = new Paho.Message((value + 1).toString());
    message.destinationName = "mqtt-async-test/value"
    c.send(message);
    console.log("Message Sent");
  }

  return (
    <View style={style.container}>
      <Text>Value is: {value}</Text>
      <Button onPress={() => {changeValue(client);}} title = "Press"/>
      <Button
        title="Go to details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export function DetailsScreen() {
  return (
    <View style={style.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});