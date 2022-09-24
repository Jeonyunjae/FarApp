/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOne_One: 'One',
              TabOne_Two: 'Two',
              TabOne_Three: 'Three',
            },
          },
          TabTwo: {
            screens: {
              TabTwo_One: 'One',
              TabTwo_Two: 'Two',
              TabTwo_Three: 'Three',
            },
          },
          TabThree: {
            screens: {
              TabThree_One: 'One',
              TabThree_Two: 'Two',
              TabThree_Three: 'Three',
            },
          },
          TabFour: {
            screens: {
              TabFour_One: 'One',
              TabFour_Two: 'Two',
              TabFour_Three: 'Three',
            },
          },
          TabFive: {
            screens: {
              TabFive_One: 'One',
              TabFive_Two: 'Two',
              TabFive_Three: 'Three',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
