import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TabOne_One from '../../screens/TabOne/TabOne_One';
import TabOne_Three from '../../screens/TabOne/TabOne_Three';
import TabOne_Two from '../../screens/TabOne/TabOne_Two';
import { RootTabScreenProps, TabOneParamList } from '../../types';

const Stack = createNativeStackNavigator<TabOneParamList>();

export default function TabOne({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabOne_One" component={TabOne_One} />
      <Stack.Screen name="TabOne_Two" component={TabOne_Two} />
      <Stack.Screen name="TabOne_Three" component={TabOne_Three} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
