import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const LocationDropdownComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="BHT" />
          <Menu.Item onPress={() => {}} title="BB" />
          <Divider />
          <Menu.Item onPress={() => {}} title="KE" />
        </Menu>
    </Provider>
  );
};

export default LocationDropdownComponent;