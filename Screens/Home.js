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
import Hall from "../components/Hall";

client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  `washer-${parseInt(Math.random() * 100)}`
);

export function HomeScreen({ navigation }) {

  const [value, setValue] = useState("off");
  const [value2, setValue2] = useState("off");

  const [hall, setHall] = useState(beta);

  const bolt = new Hall("Bolt", ["B/W/L", "B/D/LR"]);
  const timmer = new Hall("Timmer", ["B/W/L", "B/D/LR"]);
  const beta = new Hall("Beta", ["beta/washer/right", "beta/dryer/right"]);
  const halls = [bolt, timmer, beta];

  function menuCallback(hallData) {
    const newHall = hallData;
    setHall(newHall);
    console.log(newHall);
  }

  function onMessage(message) {
    if (message.destinationName === hall.getMachines()[0]) {
      console.log("received from first washer");
      setValue(message.payloadString);
    } else if (message.destinationName === hall.getMachines()[1]) {
      console.log("received from first dryer");
      setValue2(message.payloadString);
    }
  }

  useEffect(() => {
    //client.unsubscribe(hall.getMachines()[0]);
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe(hall.getMachines()[0]);
        client.subscribe(hall.getMachines()[1]);
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });
  }, [hall])

  return (
    <ScrollView style={style.container}>
            <LocationDropdownComponent parentCallback = {menuCallback} halls={halls}></LocationDropdownComponent>
      <Text style={style.largeLabelText}>Washers</Text>
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
        <DryerCardComponent data = {value2}/>
        <DryerCardComponent data = {value2}/>
      </View>
      <View style={style.cardContainer}>
        <DryerCardComponent data = {value2}/>
        <DryerCardComponent data = {value2}/>
      </View>
    </ScrollView>
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