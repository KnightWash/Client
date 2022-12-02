import Paho from "paho-mqtt"
import React from 'react';
import { DefaultTheme, Provider as PaperProvider, Button, Menu } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import WasherCardComponent from '../components/WasherCard';
import DryerCardComponent from '../components/DryerCard';
import LocationDropdownComponent from '../components/LocationDropdown';
import { useState, useEffect, setIte, useRef } from 'react';
import { ThemeColors } from "react-navigation";
import { theme } from "../theme";
import { color } from "react-native-reanimated";
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
  const [washers, setWashers] = useState([...initialMachines]);
  const [dryers, setDryers] = useState([...initialMachines]);

  // TODO: hall is not initialized as soon as the app is opened
  const [hall, setHall] = useState("beta");

  // TODO: This should be in a database at some point.
  const bolt = new Hall("bolt", ["B/W/L", "B/D/LR"]);
  const timmer = new Hall("timmer", ["B/W/L", "B/D/LR"]);
  const beta = new Hall("beta", ["beta/washer/right", "beta/dryer/right"]);
  const gamma = new Hall("gamma", ["gamma/washer/left", "gamma/dryer/left"]);
  const halls = [bolt, timmer, beta, gamma];

  function MachineComponents(props) {
    const washerList = props.machines;
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
    //client.unsubscribe("/#");
    hallRef.current = hallData.getName();
    setDryers([]);
    setWashers([]);
    console.log("got to menu callback. changing hall to " + hallData.getName());
    setHall(hallData.getName());
  }

  function onMessage(message) {
    const newMachine = new Machine(message.destinationName, message.payloadString);

    //console.log(currentSearch);
    console.log(hallRef.current + "/washer");
    if (message.destinationName.includes(hallRef.current + "/washer")) {
      //console.log("Found a washer");
      const currentWasherSearch = washersRef.current.find(o => o.name === newMachine.name);
      let newList = washersRef.current;
      //console.log(newList);
      if (currentWasherSearch?.getName() === newMachine.getName()) {
        console.log("got to update washer");
        newList[newList.indexOf(currentWasherSearch)] = newMachine;
        setWashers(() => [...newList]);
      } else {
        console.log("got to set new washer");
        setWashers((prev) => {
          return  [...prev, newMachine]
        });
      }
    } else if (message.destinationName.includes(hallRef.current + "/dryer")) {
      //console.log("Found a dryer");
      const currentDryerSearch = dryersRef.current.find(o => o.name === newMachine.name);
      let newList = dryersRef.current;
      if (currentDryerSearch?.getName() === newMachine.getName()) {
        console.log("got to update dryer");
        newList[newList.indexOf(currentDryerSearch)] = newMachine;
        setDryers(() => [...newList]);
      } else {
        console.log("got to set new dryer");
        setDryers((prev) => {
          return  [...prev, newMachine]
        });
      }
    }
  }

  const washersRef = useRef([]);
  useEffect(() => {
    //console.log("got to useEffect!");
    washersRef.current = [...washers];
    //console.log(washersRef);
  }, [washers]);

  const dryersRef = useRef([]);
  useEffect(() => {
    //console.log("got to useEffect!");
    dryersRef.current = [...dryers];
    //console.log(washersRef);
  }, [dryers]);

  const hallRef = useRef("");
  useEffect(() => {
    console.log("got to useEffect line 112");
    hallRef.current = hall;
    console.log(hallRef.current);
  }, [hall]);



  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        // subscribe to all topics with the current hall's name
        client.subscribe("calvin/#");
        //client.subscribe("calvin/" + hallRef.current.getName() + "/#");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });
    // return () => {
    //    client.unsubscribe("/#");
    // };
  }, [])

  return (
    <ScrollView style={style.container} contentContainerStyle={{ flexGrow: 1 }}>
      <LocationDropdownComponent parentCallback = {menuCallback} halls={halls}></LocationDropdownComponent>
      <Text style={style.largeLabelText}>Washers</Text>
      <MachineComponents machines={washersRef.current}></MachineComponents>
      <Text style={style.largeLabelText}>Dryers</Text>
      <MachineComponents machines={dryersRef.current}></MachineComponents>
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
    flex: 1,
    color: theme.colors.largeLabelText,
    fontSize: theme.fonts.large.fontSize,
    fontFamily: theme.fonts.large.fontFamily
  }
});