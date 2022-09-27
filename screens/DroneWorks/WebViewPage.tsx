import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';


export default function WebWiewPage({route}:any) {
  var result = route.params.Address.split(' ')
  var value = result[0]+" "+result[1]+" "+route.params.Name
  console.log(value)
  return (
    <WebView 
      style={styles.container}
      //source={{ uri: 'https://search.naver.com/search.naver?where=view&sm=tab_jum&query='+value }}
      source={{ uri: 'https://www.google.com/search?q='+value }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});