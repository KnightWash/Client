import Paho from "paho-mqtt"
import React from 'react';
import { DefaultTheme, Provider as PaperProvider, Button, Menu } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import WasherCardComponent from '../components/WasherCard';
import DryerCardComponent from '../components/DryerCard';
import LocationDropdownComponent from '../components/LocationDropdown';
import { useState, useEffect, setIte, useRef, useContext } from 'react';
import { ThemeColors } from "react-navigation";
import { theme } from "../theme";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import Hall from "../components/Hall";
import Machine from "../components/Machine";
//import { sendPushNotification, registerForPushNotificationsAsync, NotifContext } from "../App";



client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  `washer-${parseInt(Math.random() * 100)}`
);

export function HomeScreen({ navigation, route }) {

  //const { expoPushToken, setExpoPushToken } = useContext(NotifContext);
  const initialMachines = [];
  const [washers, setWashers] = useState([...initialMachines]);
  const [dryers, setDryers] = useState([...initialMachines]);
  // const [washerSwitchValues, setWasherSwitchValues] = useState([]);
  // const [dryerSwitchValues, setDryerSwitchValues] = useState([]);

  // TODO: hall is not initialized as soon as the app is opened
  const [hall, setHall] = useState("beta");

  // TODO: This should be in a database at some point.
  const bolt = new Hall("bolt", ["B/W/L", "B/D/LR"]);
  const timmer = new Hall("timmer", ["B/W/L", "B/D/LR"]);
  const beta = new Hall("beta", ["beta/washer/right", "beta/dryer/right"]);
  const gamma = new Hall("gamma", ["gamma/washer/left", "gamma/dryer/left"]);
  const halls = [bolt, timmer, beta, gamma];


  function MachineComponents(props) {
    //console.log("CALLING MACHINE COMPONENTS")

    function childToParent(index, value) {
      console.log("got to change notiflist");

      //console.log(newList);
      if (props.type === "washer") {
        const newList = washersRef.current;
        newList[index].notifs = value;
        console.log(newList[index]);
        setWashers(() => [...newList]);
      } else if (props.type === "dryer") {
        const newList = dryersRef.current;
        newList[index].notifs = value;
        setDryers(() => [...newList]);
      }
    }

    // const notifRef = useRef([]);
    // useEffect(() => {
    //   if (props.type === "washer") {
    //     notifRef.current = [...washerSwitchValues];
    //   } else if (props.type === "dryer") {
    //     notifRef.current = [...dryerSwitchValues];
    //   }
    //   //notifRef.current = [...switchValues];
    //   console.log(notifRef.current);
    // }, [washerSwitchValues, dryerSwitchValues]);

    const washerList = props.machines;
    const washerMap = washerList.map((washer, index) =>
      <WasherCardComponent key = {washer.name} data = {{washer: washer, value: washer.getNotifs(), index: index}} childToParent={childToParent}/>
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
    const newMachine = new Machine(message.destinationName, message.payloadString, false);

    //console.log(currentSearch);
    //console.log(hallRef.current + "/washer");
    if (message.destinationName.includes(hallRef.current + "/washer")) {
      //console.log("Found a washer");
      const currentWasherSearch = washersRef.current.find(o => o.name === newMachine.name);
      let newList = washersRef.current;
      //console.log(newList);
      if (currentWasherSearch?.getName() === newMachine.getName()) {
        // if (currentWasherSearch?.getNotifs() !== newMachine.getNotifs()) {
        //   newMachine.notifs = currentWasherSearch.getNotifs();
        // }
        console.log("got to update washer");
        newMachine.notifs = currentWasherSearch?.notifs;
        newList[newList.indexOf(currentWasherSearch)] = newMachine;
        //newList[newList.indexOf(newMachine)].notifs = washers[newList.indexOf(currentWasherSearch)].getNotifs();
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
        if (currentDryerSearch?.getNotifs() !== newMachine.getNotifs()) {
          newMachine.notifs = currentDryerSearch.getNotifs();
        }
        console.log("got to update dryer");
        newMachine.notifs = currentDryerSearch?.notifs;
        newList[newList.indexOf(currentDryerSearch)] = newMachine;
        //newList[newList.indexOf(newMachine)].notifs = washers[newList.indexOf(currentDryerSearch)].getNotifs();
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
  }, [washers]);

  const dryersRef = useRef([]);
  useEffect(() => {
    //console.log("got to useEffect!");
    dryersRef.current = [...dryers];
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
  }, [])

  return (
    <ScrollView style={style.container} contentContainerStyle={{ flexGrow: 1 }}>
      <LocationDropdownComponent parentCallback = {menuCallback} halls={halls}></LocationDropdownComponent>
      <Text style={style.largeLabelText}>Washers</Text>
      <MachineComponents machines={washersRef.current} type={"washer"}></MachineComponents>
      <Text style={style.largeLabelText}>Dryers</Text>
      <MachineComponents machines={dryersRef.current} type={"dryer"}></MachineComponents>
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