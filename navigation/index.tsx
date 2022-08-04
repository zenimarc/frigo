import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { ColorSchemeName, Pressable, Image } from "react-native";

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
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="addFoodModal" component={ModalScreen} options={{ title: "Add Food" }} />
        <Stack.Screen
          name="cameraModal"
          component={CameraModalScreen}
          options={{ title: "Camera" }}
        />
      </Stack.Group>
      <Stack.Screen name="recipeModal" component={RecipeModalScreen} />
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
          backgroundColor: Colors[colorScheme].background,
          ...(landScapeMode && { display: "none" }),
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconInactive,
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
            color: "white",
            display: "flex",
            justifyContent: "center",
          },
          title: "frigo",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/refrigerator-icon.png")}
              style={{ width: 20, height: 35, tintColor: color }}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("addFoodModal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
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
            color: "white",
            display: "flex",
            justifyContent: "center",
          },
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
