import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import LoggedInNav from './navigation/LoggedInNav';
import LoggedOutNav from './navigation/LoggedOutNav';
import { AppearanceProvider } from 'react-native-appearance';
import DroneWorksNav from './navigation/DownWorksNav';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from 'react';
import { Region } from 'react-native-maps';
import * as Location from "expo-location";
import AppLoading from 'expo-app-loading';
import { Dimensions } from 'react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (!isLoadingComplete) {
    return null;
  } else {

    return (
      <AppearanceProvider>
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            {/* {isLoggedIn ? (
              <LoggedInNav colorScheme={colorScheme} />
            ) : (
              <LoggedOutNav colorScheme={colorScheme} />
            )} */}
            <DroneWorksNav colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </ApolloProvider>
      </AppearanceProvider>
    );
  }
}
