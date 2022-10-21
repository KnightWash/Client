import * as React from 'react';
import { Drawer } from 'react-native-paper';
import {HomeScreen} from '../Screens/Home';
import { useNavigation } from '@react-navigation/native';

export const DrawerComponent = ({navigation}) => {
  const [active, setActive] = React.useState('');
  //const navigation = useNavigation();
  return (
    <Drawer.Section title="Screens">
      <Drawer.Item
        label="Home"
        active={active === 'Home'}
        onPress={() => navigation.closeDrawer()}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}dxz
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
};