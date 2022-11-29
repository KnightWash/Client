import Paho from "paho-mqtt"
import React from 'react';
import { DefaultTheme, Provider as PaperProvider, Button, Menu } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import WasherCardComponent from '../components/WasherCard';
import LocationDropdownComponent from '../components/LocationDropdown';
import { useState, useEffect, setIte } from 'react';
import { theme } from "../theme";
import { ScrollView } from "react-native-gesture-handler";
import Hall from "../components/Hall";
import Machine from "../components/Machine";

client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  `washer-${parseInt(Math.random() * 100)}`
);

export function HomeScreen({ navigation }) {

  const initialMachines = [];
  const [washers, setWashers] = useState(initialMachines);
  const [dryers, setDryers] = useState(initialMachines);

  // TODO: hall is not initialized as soon as the app is opened
  const [hall, setHall] = useState(beta);

  // TODO: This should be in a database at some point.
  const bolt = new Hall("bolt", ["B/W/L", "B/D/LR"]);
  const timmer = new Hall("timmer", ["B/W/L", "B/D/LR"]);
  const beta = new Hall("beta", ["beta/washer/right", "beta/dryer/right"]);
  const halls = [bolt, timmer, beta];

  function MachineComponents(props) {
    const washerList = props.machines;
    console.log(props.machines);
    const washerMap = washerList.map((washer) =>
      <WasherCardComponent key = {washer.name} data = {washer}/>
    );

    return (
      <View style={style.cardContainer}>
        {washerMap}
      </View>
    );
  }

  function menuCallback(hallData) {
    setHall(hallData);
  }

  function onMessage(message) {
    if (message.destinationName === hall.getMachines()[0]) {
      setValue(message.payloadString);
    } else if (message.destinationName === hall.getMachines()[1]) {
      setValue2(message.payloadString);
    }
    const newMachine = new Machine(message.destinationName, message.payloadString);
    if (washers.find(o => o.name === newMachine.getName()) !== newMachine && message.destinationName.includes("washer")) {
      setWashers([...washers, newMachine]);
    } else if (dryers.find(o => o.name === newMachine.getName()) !== newMachine && message.destinationName.includes("dryer")) {
      setDryers([...dryers, newMachine]);
    }
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        // subscribe to all topics with the current hall's name
        client.subscribe(hall.getName().concat("/#"));
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });
  }, [hall])

  return (
    <ScrollView style={style.container} contentContainerStyle={{ flexGrow: 1 }}>
      <LocationDropdownComponent parentCallback = {menuCallback} halls={halls}></LocationDropdownComponent>
      <Text style={style.largeLabelText}>Washers</Text>
      <MachineComponents machines={washers}></MachineComponents>
      <Text style={style.largeLabelText}>Dryers</Text>
      <MachineComponents machines={dryers}></MachineComponents>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
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