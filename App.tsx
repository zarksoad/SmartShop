import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import SplashScreenComponent from './src/screens/splashScreen/SplashScreen';
import ShoppingListApp from './src/screens/home/ShoppingList';
import * as eva from '@eva-design/eva';
import AddItemScreen from './src/screens/addItem/AddItemScreen';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

export interface RootStackParamList extends ParamListBase {
  SplashScreen: undefined;
  MainScreen: undefined;
  AddItemScreen: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreenComponent}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainScreen"
            component={ShoppingListApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddItemScreen"
            component={AddItemScreen}
            options={{title: 'Add Item'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default AppNavigator;
