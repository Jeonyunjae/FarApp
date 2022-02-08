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
          TabFriend: {
            screens: {
              TabFriendScreen: 'friend',
            },
          },
          TabChat: {
            screens: {
              TabChatScreen: 'chat',
            },
          },
          TabCommunity: {
            screens: {
              TabCommunityScreen: 'community',
            },
          },
          TabRegion: {
            screens: {
              TabRegionScreen: 'region',
            },
          },
          TabUser: {
            screens: {
              TabUserScreen: 'user',
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
