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
import * as Location from "expo-location";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const API_KEY = "8f4d0ab3c9180ae0820be2bd2d43b0a4";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const WEATHER_DATA = [{}];

function HomeScreen({ navigation, route }) {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="update count" />
      ),
    });
  });
  useEffect(() => {
    if (route.params?.post) {
    }
  }, [route.params?.post]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text>{count}</Text>
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: "Home",
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

const Stack = createNativeStackNavigator();

function DetailScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: "My Home",
            headerRight: () => (
              <Button onPress={() => alert("this is a button!")} title="info" />
            ),
          }}
        />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <>
    //   <StatusBar />
    //   <ScrollView>
    //     <View style={styles.container}>
    //       <View style={styles.city}>
    //         <Text style={styles.cityName}>군복무 가이드</Text>
    //       </View>
    //       <ScrollView
    //         pagingEnabled
    //         horizontal={true}
    //         showsHorizontalScrollIndicator="false"
    //         contentContainerStyle={styles.topCardContainer}
    //         decelerationRate={0}
    //         snapToInterval={314 + 18} //your element width
    //         snapToAlignment={"center"}
    //         contentInset={{
    //           // iOS ONLY
    //           top: 0,
    //           left: 24,
    //           bottom: 0,
    //           right: 24,
    //         }}
    //       >
    //         <View style={styles.topCard} />
    //         <View style={styles.topCard} />
    //         <View style={styles.topCard} />
    //         <View style={styles.topCard} />
    //         <View style={styles.topCard} />
    //       </ScrollView>

    /* <View style={styles.contentCard}>
            <Text style={styles.cardTitle}>찜한 혜택</Text>
          </View>
          <View style={styles.contentCard}>
            <Text style={styles.cardTitle}>자기계발</Text>
          </View>
          <View style={styles.contentCard} />
        </View>
      </ScrollView> */
    // </>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    marginTop: 32,
    marginLeft: 26,
    fontSize: 20,
    fontWeight: "600",
    color: "#2A364E",
  },
  contentCard: {
    height: 364,
    backgroundColor: "#F8F8F8",
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 20,
    marginBottom: 16,
  },

  topCard: {
    width: 314,
    height: 118,
    backgroundColor: "#F3F4F1",
    borderRadius: 20,
    marginRight: 16,
  },

  topCardContainer: {
    // backgroundColor: "black",
    marginBottom: 28,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  city: {
    marginTop: 90,
    marginBottom: 44,
    // marginLeft: 30,
  },
  cityName: {
    marginLeft: 24,
    fontSize: 26,
    color: "#2A364E",
    fontWeight: "900",
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

// const [city, setCity] = useState("Loading...");
//   const [days, setDays] = useState([]);
//   const [ok, setOk] = useState(true);
//   const getWeather = async () => {
//     const { granted } = await Location.requestForegroundPermissionsAsync();
//     if (!granted) {
//       setOk(false);
//     }
//     const {
//       coords: { latitude, longitude },
//     } = await Location.getCurrentPositionAsync({ accuracy: 5 });
//     const location = await Location.reverseGeocodeAsync(
//       {
//         latitude,
//         longitude,
//       },
//       { useGoogleMaps: false }
//     );
//     setCity(location[0].city);
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
//     );
//     const json = await response.json();
//     setDays(json.daily);
//   };
//   useEffect(() => {
//     getWeather();
//   }, []);

{
  /* <ScrollView
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
</ScrollView> */
}
