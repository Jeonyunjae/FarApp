import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';


export default function WebWiewPage({route}:any) {
  return (
    <WebView 
      style={styles.container}
      source={{ uri: 'https://search.naver.com/search.naver?where=view&sm=tab_jum&query='+route.params }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});