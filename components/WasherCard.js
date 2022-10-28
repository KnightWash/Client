import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import { useRoute } from '@react-navigation/native';

const WasherCardComponent = (props) => {
  const route = useRoute();
  return(
  <View style = {styles.border}>
  <Card style = {styles.container}>
    <Card.Content>
      <Title>Washer 1</Title>
      <Paragraph style = {(props.data === "on") ? styles.washerOn : styles.washerOff}>{props.data}</Paragraph>
      <Card.Cover style = {styles.washerImg} source={require('../assets/knightwash.png')} />
    </Card.Content>
  </Card>
  </View>
  );
}
export default WasherCardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: 'flex-start',
    padding: 5,
    width: 200,
    height: 200
  },
  border: {
    flex: .5,
    borderWidth: 1,
    borderColor:"#ffffff",
  },
  washerImg: {
    width: 150,
    height: 150
  },
  washerOn: {
    color: "red",
  },
  washerOff: {
    color: "green"
  }
});