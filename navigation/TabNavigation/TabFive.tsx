import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TabFive_One from '../../screens/TabOne/TabOne_One';
import TabFive_Three from '../../screens/TabOne/TabOne_Three';
import TabFive_Two from '../../screens/TabOne/TabOne_Two';
import { RootTabScreenProps, TabFiveParamList } from '../../types';

const Stack = createNativeStackNavigator<TabFiveParamList>();

export default function TabFive({ navigation }: RootTabScreenProps<'TabFive'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabFive_One"
        component={TabFive_One}
        options={{ title: "Overview" }}
      />
      <Stack.Screen
        name="TabFive_Two"
        component={TabFive_Two}
        options={{ title: "Overview" }}
      />
      <Stack.Screen
        name="TabFive_Three"
        component={TabFive_Three}
        options={{ title: "Overview" }}
      />
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
