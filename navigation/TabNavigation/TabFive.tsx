import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TabOne_One from '../../screens/TabOne/TabOne_One';
import TabOne_Three from '../../screens/TabOne/TabOne_Three';
import TabOne_Two from '../../screens/TabOne/TabOne_Two';
import { RootTabScreenProps, TabFiveParamList } from '../../types';

const Stack = createNativeStackNavigator<TabFiveParamList>();

export default function TabFive({ navigation }: RootTabScreenProps<'TabFive'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabFive_One"
        component={TabOne_One}
        options={{ title: "Overview" }}
      />
      <Stack.Screen
        name="TabFive_Two"
        component={TabOne_Two}
        options={{ title: "Overview" }}
      />
      <Stack.Screen
        name="TabFive_Three"
        component={TabOne_Three}
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
