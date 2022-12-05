import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useState, useEffect, setIte, useRef } from 'react';
import { Button, Menu, Divider, Provider, BottomNavigation } from 'react-native-paper';
import { theme } from "../theme";
import Hall from './Hall';

const LocationDropdownComponent = ({halls, parentCallback}) => {
  const [visible, setVisible] = React.useState(false);
  const [hall, setHall] = React.useState(halls[2]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const changeHall = (selection) => {
    setHall(selection);
    //sendData();
  };

  const hallRef = useRef("");
  useEffect(() => {
    console.log("got to hallRef Dropdown! -------------");
    hallRef.current = hall;
    console.log(hallRef.current);
    parentCallback(hallRef.current);
  }, [hall]);

  sendData = () => {
    parentCallback(hall);
  };

  return (
    <View style={{zIndex: 100}}>
    <Provider>
      <View>
        <Menu
          style={style.menu}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{`${hall.getName()}`} ▼</Button>}>
          {halls.map((hall) => {
            return (
              <Menu.Item key={hall.getName()} onPress={() => {changeHall(hall)}} title={hall.getName()} />
            );
          })}
        </Menu>
      </View>

    </Provider>
    </View>
  );
};

export default LocationDropdownComponent;

const style = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row'
  },
  menu: {
    position:'absolute',
    right:'10%',
    left:'10%',
    zIndex: 100,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  labelText: {
    color: theme.colors.largeLabelText,
    fontSize: theme.fonts.medium.fontSize,
    fontFamily: theme.fonts.medium.fontFamily
  }
});