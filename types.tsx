/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CameraCapturedPicture } from "expo-camera";
import { RecipeGivenIngredientsResponse } from "./components/RecipeCard";
import { ComplexSearchResp, ComplexSearchResultsEntity } from "./helper_data_types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  addFoodModal:
    | undefined
    | {
        photo: CameraCapturedPicture | undefined;
        key: string | undefined;
        scanner: boolean | undefined;
        editing: boolean;
      };
  cameraModal: { sendItemBack: boolean; receiverRouteName: string };
  recipeModal: { recipeData: ComplexSearchResultsEntity };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ReceiverRouteNamesFromCamera = "addFoodModal";
