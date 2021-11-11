import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import * as Location from "expo-location";

const API_KEY = "8f4d0ab3c9180ae0820be2bd2d43b0a4";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const WEATHER_DATA = [{}];

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView
          pagingEnabled
          horizontal={true}
          showsHorizontalScrollIndicator="false"
          contentContainerStyle={styles.weather}
          decelerationRate={0}
          snapToInterval={SCREEN_WIDTH - 60 + 10} //your element width
          snapToAlignment={"center"}
          contentInset={{
            // iOS ONLY
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}
          contentContainerStyle={{
            // contentInset alternative for Android
            paddingHorizontal:
              Platform.OS === "android" ? SCREEN_WIDTH - 60 : 0, // Horizontal spacing before and after the ScrollView
          }}
        >
          {days.length === 0 ? (
            <View style={styles.day}>
              <ActivityIndicator color="white" size="large" />
            </View>
          ) : (
            days.map((day, index) => (
              <View key={index} style={styles.day}>
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.description}>
                  {day.weather[0].description}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  city: {
    flex: 0.4,
    marginTop: 90,
    // marginBottom: 50,
    // marginLeft: 30,
    alignItems: "center",
  },
  cityName: {
    fontSize: 32,
    color: "#2A364E",
    fontWeight: "500",
  },
  weather: {},
  day: {
    height: 400,
    width: SCREEN_WIDTH - 60,
    backgroundColor: "#2A364E",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
  },
  temp: {
    color: "black",
    fontSize: 100,
  },
  description: {
    color: "white",
    fontSize: 32,
  },
});
