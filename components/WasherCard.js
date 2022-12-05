import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet, View, Text, Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Switch } from 'react-native-paper';
import { sendPushNotification, registerForPushNotificationsAsync, NotifContext } from "../App";
import { useEffect, useState, useRef, useContext } from 'react';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

const WasherCardComponent = (props) => {
  const { expoPushToken, setExpoPushToken } = useContext(NotifContext);
  const route = useRoute();
  const [isEnabled, setIsEnabled] = useState(props.data.value);

  const onToggleSwitch = () => {
    console.log("toggling notifications!");
    //console.log(props.data.value);
    let newEnabled = notifValRef.current;
    if (typeof notifValRef.current !== 'undefined'){
      console.log("isEnabled existed, setting to opposite value");
      newEnabled = !notifValRef.current;
      setIsEnabled(newEnabled);
    } else {
      console.log("isEnabled did not exist, setting to true");
      newEnabled = true;
      setIsEnabled(newEnabled);
    }
    console.log(newEnabled);
    props.childToParent(props.data.index, newEnabled);
  }

  const notifValRef = useRef("");
  useEffect(() => {
    notifValRef.current = isEnabled;
  }, [isEnabled]);

  useEffect(() => {
    if (notifValRef.current === true) {
      console.log("got to defined useEffect!");
      if (props.data.washer.getStatus() == "Off") {
        sendPushNotification(expoPushToken);
        props.childToParent(props.data.index, false);
      } else {
        //props.childToParent(props.data.index, );
      }
    }

    if (typeof notifValRef.current === 'undefined') {
      //console.log("got to useEffect!");
      //console.log(notifValRef.current);
      //setIsEnabled(false);
      //props.childToParent(props.data.index, false);
    } else {
      //props.childToParent(props.data.index, notifValRef.current);
    }
    //console.log(washersRef);
  }, []);

  return(
  <View style = {styles.border}>
  <Card style = {styles.container}>
    <Card.Content>
      <Title style = {{fontSize: 15}}>{props.data.washer.getName()}</Title>
      <Paragraph style = {(props.data.washer.getStatus() === "On") ? styles.washerOn : styles.washerOff}>{(props.data.washer.getStatus() === "On") ? "Running" : "Open"}</Paragraph>
      <View style={styles.notifySection}>
        <Text style={styles.notifyText}>Notify me!</Text>
        <Switch style={styles.notifySwitch} value={props.data.value} onValueChange={onToggleSwitch} />
      </View>
    </Card.Content>
    <Card.Cover style = {styles.washerImg} source={require('../assets/knightwash.png')} />
  </Card>
  </View>
  );
}
export default WasherCardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'flex-start',
    padding: 3,
    margin: 5,
    width: '90%',
  },
  border: {
    flex: 0,
    borderWidth: 0,
    borderColor:"#ffffff",
    width: '50%',
    height: '50%'
  },
  washerImg: {
    width: 100,
    height: 100,
  },
  washerOn: {
    color: "red",
    fontSize: 20
  },
  washerOff: {
    color: "green",
    fontSize: 20
  },
  notifySection: {
    flexDirection: "row"
  },
  notifyText: {
    fontSize: 15,
  },
  notifySwitch: {
    flex: 1,
  }
});