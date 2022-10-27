import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export function WasherCardComponent() {
  return (
    <View style={styles.border}>
      <Card style={styles.container}>
        <Card.Content>
          <Title>Washer 1</Title>
          <Paragraph>Time: 20:00</Paragraph>
          <Card.Cover source={{ uri: 'https://picsum.photos/100/200' }} />
        </Card.Content>
      </Card>
    </View>
  );
}

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
    borderColor: "#ffffff",
  }
});