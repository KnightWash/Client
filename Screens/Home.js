import Paho from "paho-mqtt"
import React from 'react';
import { DefaultTheme, Provider as PaperProvider, Button, Menu } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import WasherCardComponent from '../components/WasherCard';
import DryerCardComponent from '../components/DryerCard';
import LocationDropdownComponent from '../components/LocationDropdown';
import { useState, useEffect, setIte } from 'react';
import { ThemeColors } from "react-navigation";
import { theme } from "../theme";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  `washer-${parseInt(Math.random() * 100)}`
);

export function HomeScreen({ navigation }) {

  const [value, setValue] = useState("off");

  function onMessage(message) {
    if (message.destinationName === "washer")
      console.log("received");
    setValue(message.payloadString);
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("washer");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });
  }, [])

  return (
    <ScrollView style={style.container}>
      <LocationDropdownComponent></LocationDropdownComponent>
      <Text style={style.largeLabelText}>Washers</Text>
      <Text>on/off value: {value}</Text>
      <View style={style.cardContainer}>
        <WasherCardComponent data = {value}/>
        <WasherCardComponent data = {value}/>
      </View>
      <View style={style.cardContainer}>
        <WasherCardComponent data = {value}/>
        <WasherCardComponent data = {value}/>
      </View>
      <Text style={style.largeLabelText}>Dryers</Text>
      <View style={style.cardContainer}>
        <DryerCardComponent data = {value}/>
        <DryerCardComponent data = {value}/>
      </View>
      <View style={style.cardContainer}>
        <DryerCardComponent data = {value}/>
        <DryerCardComponent data = {value}/>
      </View>
    </ScrollView>
  );
}

export function LocationDropdownHeader() {
  return (
    <LocationDropdownComponent></LocationDropdownComponent>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  largeLabelText: {
    color: theme.colors.largeLabelText,
    fontSize: theme.fonts.large.fontSize,
    fontFamily: theme.fonts.large.fontFamily
  }
});