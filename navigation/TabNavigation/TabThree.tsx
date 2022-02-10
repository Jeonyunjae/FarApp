import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TabThree_One from '../../screens/TabThree/TabThree_One';
import TabThree_Three from '../../screens/TabThree/TabThree_Three';
import TabThree_Two from '../../screens/TabThree/TabThree_Two';
import { RootTabScreenProps, TabThreeParamList } from '../../types';


const Stack = createNativeStackNavigator<TabThreeParamList>();

export default function TabThree({ navigation }: RootTabScreenProps<'TabThree'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabThree_One"
        component={TabThree_One}
        options={{ title: "Overview" }}
      />
      <Stack.Screen
        name="TabThree_Two"
        component={TabThree_Two}
        options={{ title: "Overview" }}
      />
      <Stack.Screen
        name="TabThree_Three"
        component={TabThree_Three}
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
