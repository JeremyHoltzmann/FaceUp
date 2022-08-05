import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import SnapScreen from "./screens/SnapScreen";
import GalleryScreen from "./screens/GalleryScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import userName from "./reducers/userName.reducer";
import POIList from "./reducers/POI.reducer";
import imagesUrl from "./reducers/imagesUrl.reducer";

import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ userName, POIList, imagesUrl }));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsGenerator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Gallery") {
            iconName = "photo-library";
            return <MaterialIcons name={iconName} size={25} color={color} />;
          } else if (route.name === "Snap") {
            iconName = "camera";
            return <AntDesign name={iconName} size={25} color={color} />;
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#009788",
        inactiveTintColor: "#FFFFFF",
        style: { backgroundColor: "#111224" },
      }}
    >
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Gallery" component={TabsGenerator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
