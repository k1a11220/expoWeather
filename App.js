import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Feed") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? `ios-list` : "ios-list-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
};

const Feed = () => {
  return (
    <View style={styles.center}>
      <Text>Feed Screen</Text>
    </View>
  );
};

const Messages = () => {
  return (
    <View style={styles.center}>
      <Text>Messages Screen</Text>
    </View>
  );
};

const Profile = () => {
  return (
    <View style={styles.center}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const Settings = () => {
  return (
    <View style={styles.center}>
      <Text>Settings Screen</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShow: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
