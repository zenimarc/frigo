import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { ColorSchemeName, Image } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import CameraModalScreen from "../screens/CameraModalScreen";
import ModalScreen from "../screens/ModalScreen";
import { RecipeModalScreen } from "../screens/RecipeModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import TabOneAndTwo from "../screens/TabOneAndTwo";
import useLandscapeMode from "../hooks/useLandscapeMode";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen 
          name="addFoodModal" 
          component={ModalScreen} 
          options={
            { 
            title: "Add Food", 
            headerStyle: {backgroundColor: Colors[useColorScheme()].header},
            headerTitleStyle: {color: Colors[colorScheme].headerTextAndArrow},
            headerTintColor: Colors[colorScheme].headerTextAndArrow,
            }
          }
        />
        <Stack.Screen
          name="cameraModal"
          component={CameraModalScreen}
          options={{ title: "Camera" }}
        />
      </Stack.Group>
      <Stack.Screen 
        name="recipeModal" 
        component={RecipeModalScreen} 
        options={
          { 
            headerStyle: {backgroundColor: Colors[colorScheme].header},
            headerTitleStyle: {color: Colors[colorScheme].headerTextAndArrow},
            headerTintColor: Colors[colorScheme].headerTextAndArrow,
          }
        }
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const landScapeMode = useLandscapeMode();
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tabBarBackground,
          ...(landScapeMode && { display: "none" }),
        },
        tabBarActiveTintColor: Colors[colorScheme].tabBarIconActiveTint,
        tabBarInactiveTintColor: Colors[colorScheme].tabBarIconInactiveTint,
        headerStyle: {
          backgroundColor: Colors[colorScheme].header,
        },
        headerTitleAlign: "center",
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={!landScapeMode ? TabOneScreen : TabOneAndTwo}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          headerTitleStyle: {
            fontWeight: "600",
            fontStyle: "normal",
            fontSize: 30,
            color: Colors[colorScheme].headerTextAndArrow,
            display: "flex",
            justifyContent: "center",
          },
          tabBarActiveTintColor: Colors[colorScheme].tabBarIconActiveTint,
          title: "frigo",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/refrigerator-icon.png")}
              style={{ width: 20, height: 35, tintColor: color }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={!landScapeMode ? TabTwoScreen : TabOneAndTwo}
        options={{
          headerTitleStyle: {
            fontWeight: "600",
            fontStyle: "normal",
            fontSize: 30,
            color: Colors[colorScheme].headerTextAndArrow,
            display: "flex",
            justifyContent: "center",
          },
          tabBarActiveTintColor: Colors[colorScheme].tabBarIconActiveTint2,
          title: "recipes",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/recipes2-icon.png")}
              style={{ width: 28, height: 37, tintColor: color }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
