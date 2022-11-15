import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Switch } from 'react-native-paper';

const DryerCardComponent = (props) => {
  const route = useRoute();
  const isSwitchOn = false;
  function onToggleSwitch() {
    isSwitchOn = !isSwitchOn;
  }
  return(
  <View style = {styles.border}>
  <Card style = {styles.container}>
    <Card.Content>
      <Title>Dryer 1</Title>
      <Paragraph style = {(props.data === "on") ? styles.dryerOn : styles.dryerOff}>{props.data}</Paragraph>
      <Card.Cover style = {styles.dryerImg} source={require('../assets/knightwash.png')} />
      <View style={styles.notifySection}>
        <Text style={styles.notifyText}>Notify me!</Text>
        <Switch style={styles.notifySwitch} value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </Card.Content>
  </Card>
  </View>
  );
}
export default DryerCardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 5,
    margin: 5
  },
  border: {
    flex: 1,
    borderWidth: 0,
    borderColor:"#ffffff",
    width: '50%',
    height: 230
  },
  dryerImg: {
    width: 100,
    height: 100
  },
  dryerOn: {
    color: "red",
  },
  dryerOff: {
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