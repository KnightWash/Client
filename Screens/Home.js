import React from 'react';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';
import { WasherCardComponent } from '../components/WasherCard';

export function HomeScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Washers</Text>
      <Button mode="contained"
        onPress={() => navigation.openDrawer()}>
          Press Me
      </Button>
      <WasherCardComponent/>
      <WasherCardComponent/>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});