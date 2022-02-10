import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TabFour_One from '../../screens/TabFour/TabFour_One';
import TabFour_Three from '../../screens/TabFour/TabFour_Three';
import TabFour_Two from '../../screens/TabFour/TabFour_Two';
import { RootTabScreenProps, TabFourParamList, TabOneParamList } from '../../types';


const Stack = createNativeStackNavigator<TabFourParamList>();

export default function TabFour({ navigation }: RootTabScreenProps<'TabFour'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabFour_One" component={TabFour_One} />
      <Stack.Screen name="TabFour_Two" component={TabFour_Two} />
      <Stack.Screen name="TabFour_Three" component={TabFour_Three} />
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
