import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { WasherCardComponent } from '../components/WasherCard';

export function DetailsScreen({navigation}) {
  return (
    <View style={style.container}>
      <Text>Details Screen</Text>
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