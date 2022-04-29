import { FontAwesome } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatScreen from '../screens/ChatScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, MainTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="Root" component={MainTabNavigator} options={{
        title: "WhatsApp",
        headerRight: () => (
          <View style={{flexDirection: 'row', width: 60, justifyContent: 'space-between'}}>
            <Octicons name="search" size={22} color={'white'} />
            <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
          </View>
        )
      }} />
    </Stack.Navigator>
  );
}

// Tab Navigator
const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tint,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
        }
      }}>
      <MainTab.Screen
        name="Camera"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color: string }) => <Fontisto name="camera" color={Colors[colorScheme].background} size={18} />,
          tabBarLabel: () => null
        }}
      />
      <MainTab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          tabBarLabelStyle: {
            fontWeight: 'bold'
          }
        }}
      />
      <MainTab.Screen
        name="Status"
        component={TabTwoScreen}
        options={{
          tabBarLabelStyle: {
            fontWeight: 'bold'
          }
        }}
      />
      <MainTab.Screen
        name="Calls"
        component={TabTwoScreen}
        options={{
          tabBarLabelStyle: {
            fontWeight: 'bold'
          }
        }}
      />
    </MainTab.Navigator>
  );
}