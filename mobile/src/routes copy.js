import React from "react";
import { Image } from "react-native";
//import {
//  createSwitchNavigator,
//  createBottomTabNavigator,
//  createStackNavigator
//} from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from "@expo/vector-icons";

import SignIn from "./pages/SignIn";
import Deliveries from "./pages/Delivery/Index";
import DeliveryDetails from "./pages/Delivery/Details";
import ProblemNew from "./pages/Problem/New";
import Problems from "./pages/Problem/Index";
import Profile from "./pages/Profile/Index";
// eslint-disable-next-line import/no-unresolved
import logo from "./assets/logo-horizontal.png";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptions = {
  headerLayoutPreset: "center",
  defaultNavigationOptions: {
    headerTransparent: true,
    headerTintColor: "#FFF",
    headerLeftContainerStyle: {
      marginLeft: 20
    },
    //
    headerTitle: <Image source={logo} />,
    headerStyle: {
      backgroundColor: "#FFF"
    }
  }
};

const navigationOptionsEntregas = {
  tabBarLabel: "Check-ins",
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-pizza" size={20} color={tintColor} />
  )
}

const tabIcons = {
  'Entregas': 'reorder',
  'Meu Perfil': 'account-circle',
}

function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size = 24 }) => {
          return <MaterialIcons name={tabIcons[route.name]} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#7D40E6',
        inactiveTintColor: '#999999',
      }}
    >
      <Tab.Screen name="Entregas" component={Deliveries} navigationOptions={navigationOptionsEntregas} />
      <Tab.Screen name="Meu Perfil" component={Profile} screenOptions={{}} />
    </Tab.Navigator>
  );
}

export default ({ signed }) => {
  //alert(['routes.signed', signed]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={signed ? "App" : "Sign"}>
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="Sign" component={SignIn} />

        <Stack.Screen name="Details" component={DeliveryDetails} />
        <Stack.Screen name="ProblemNew" component={ProblemNew} />
        <Stack.Screen name="Problems" component={Problems} />
      </Stack.Navigator>
      {/*createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn
        }),
        App: createBottomTabNavigator(
          {
            Checkin: {
              screen: createStackNavigator(
                {
                  Checkin
                },
                { ...headerOptions }
              ),
              navigationOptions: {
                tabBarLabel: "Check-ins",
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="local-pizza" size={20} color={tintColor} />
                )
              }
            },

            Help: {
              screen: createStackNavigator(
                {
                  HelpIndex,
                  HelpDetails,
                  HelpNew
                },
                { ...headerOptions }
              ),
              navigationOptions: {
                tabBarLabel: "Pedir ajuda",
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                )
              }
            }
          },
          {
            initialRouteName: "Checkin",
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: "#ef4d64",
              inactiveTintColor: "#ccc",
              style: {
                backgroundColor: "#fff"
              }
            }
          }
        )
      },
      {
        initialRouteName: isSigned ? "App" : "Sign"
      }
    )*/}
    </NavigationContainer>
  )
}
