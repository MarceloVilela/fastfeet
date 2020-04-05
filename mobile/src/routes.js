import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from "@expo/vector-icons";

import { navigationRef } from './RootNavigation';
import * as RootNavigation from './RootNavigation';
import SignIn from "./pages/SignIn";
import Deliveries from "./pages/Delivery/Index";
import DeliveryDetails from "./pages/Delivery/Details";
import DeliveryConfirm from "./pages/Delivery/Confirm";
import ProblemNew from "./pages/Problem/New";
import Problems from "./pages/Problem/Index";
import Profile from "./pages/Profile/Index";
import { color } from '~/styles/values.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabOptions = {
  'Delivery': { icon: 'reorder', title: 'Entregas' },
  'Profile': { icon: 'account-circle', title: 'Meu perfil' },
}

const DeliveryOptions = {
  'DeliveryIndex': { title: 'Entregas' },
  'Details': { title: 'Detalhes da encomenda' },
  'DeliveryConfirm': { title: 'Confirmar ---' },
  'ProblemNew': { title: 'Informar problema' },
  'Problems': { title: 'Visualizar problemas' },
}

const headerBackground = () => {
  return <View style={{ backgroundColor: color['primary'], width: '100%', height: '100%' }}></View>
}

function Delivery() {
  return (
    <Stack.Navigator screenOptions={({ route }) => ({
      headerBackground,
      headerTintColor: color['white'],
      headerShown: route['name'] === "DeliveryIndex" ? false : true,
      title: DeliveryOptions[route['name']]['title']
    })}>
      <Stack.Screen name="DeliveryIndex" component={Deliveries} />
      <Stack.Screen name="Details" component={DeliveryDetails} />
      <Stack.Screen name="ProblemNew" component={ProblemNew} />
      <Stack.Screen name="Problems" component={Problems} />
      <Stack.Screen name="DeliveryConfirm" component={DeliveryConfirm} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size = 24 }) => {
          return <MaterialIcons name={tabOptions[route.name]['icon']} size={size} color={color} />;
        },
        title: tabOptions[route.name]['title']
      })}
      tabBarOptions={{
        activeTintColor: color['primary'],
        inactiveTintColor: color['muted'],
      }}
      initialRouteName={"Entregas"}
    >
      <Tab.Screen name="Delivery" component={Delivery} screenOptions={{}} />
      <Tab.Screen name="Profile" component={Profile} screenOptions={{}} />
    </Tab.Navigator>
  );
}

export default ({ signed }) => {
  useEffect(() => {
    RootNavigation.navigate(signed ? "App" : "Sign");
  }, [signed])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={signed ? "App" : "Sign"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="Sign" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
