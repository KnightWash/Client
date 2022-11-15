import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { Drawer } from 'react-native-paper';
import { DefaultTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import {HomeScreen, LocationDropdownHeader} from './Screens/Home';
import {DetailsScreen} from './Screens/Details';
import {DrawerComponent} from './components/Drawer';
import {theme} from './theme';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home" component={HomeScreen}
            options={{ headerTitle: (props) => <LocationDropdownHeader {...props} /> }}/>
          <Drawer.Screen name="Details" component={DetailsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}