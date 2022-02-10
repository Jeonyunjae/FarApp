import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TabTwo_One from '../../screens/TabTwo/TabTwo_One';
import TabTwo_Three from '../../screens/TabTwo/TabTwo_Three';
import TabTwo_Two from '../../screens/TabTwo/TabTwo_Two';
import { RootTabScreenProps, TabTwoParamList } from '../../types';


const Stack = createNativeStackNavigator<TabTwoParamList>();

export default function TabTwo({ navigation }: RootTabScreenProps<'TabTwo'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabTwo_One" component={TabTwo_One} />
      <Stack.Screen name="TabTwo_Two" component={TabTwo_Two} />
      <Stack.Screen name="TabTwo_Three" component={TabTwo_Three} />
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
