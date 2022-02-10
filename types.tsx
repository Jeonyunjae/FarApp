/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: NavigatorScreenParams<LoginStackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type LoginStackParamList = {
  Welcome: undefined;
  Login: { username: string; password: string } | undefined;
  CreateAccount: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: NavigatorScreenParams<TabOneParamList> | undefined;
  TabTwo: NavigatorScreenParams<TabTwoParamList> | undefined;
  TabThree: NavigatorScreenParams<TabThreeParamList> | undefined;
  TabFour: NavigatorScreenParams<TabFourParamList> | undefined;
  TabFive: NavigatorScreenParams<TabFiveParamList> | undefined;
};

export type TabOneParamList = {
  TabOne_One: undefined;
  TabOne_Two: undefined;
  TabOne_Three: undefined;
};

export type TabTwoParamList = {
  TabTwo_One: undefined;
  TabTwo_Two: undefined;
  TabTwo_Three: undefined;
};

export type TabThreeParamList = {
  TabThree_One: undefined;
  TabThree_Two: undefined;
  TabThree_Three: undefined;
};

export type TabFourParamList = {
  TabFour_One: undefined;
  TabFour_Two: undefined;
  TabFour_Three: undefined;
};

export type TabFiveParamList = {
  TabFive_One: undefined;
  TabFive_Two: undefined;
  TabFive_Three: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
