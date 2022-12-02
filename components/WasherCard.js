import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Switch } from 'react-native-paper';

const WasherCardComponent = (props) => {
  const route = useRoute();
  const isSwitchOn = false;
  function onToggleSwitch() {
    isSwitchOn = !isSwitchOn;
  }
  return(
  <View style = {styles.border}>
  <Card style = {styles.container}>
    <Card.Content>
      <Title style = {{fontSize: 15}}>{props.data.getName()}</Title>
      <Paragraph style = {(props.data.getStatus() === "on") ? styles.washerOn : styles.washerOff}>{props.data.getStatus()}</Paragraph>
      <Card.Cover style = {styles.washerImg} source={require('../assets/knightwash.png')} />
      <View style={styles.notifySection}>
        <Text style={styles.notifyText}>Notify me!</Text>
        <Switch style={styles.notifySwitch} value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </Card.Content>
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
    height: 100
  },
  washerOn: {
    color: "red",
  },
  washerOff: {
    color: "green"
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