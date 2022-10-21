import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { WasherCardComponent } from '../components/WasherCard';

export function DetailsScreen() {
  return (
    <View style={style.container}>
      <Text>Details Screen</Text>
      <WasherCardComponent/>
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