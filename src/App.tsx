import React from 'react';
import { registerRootComponent, AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/Home';
import LocationSelector from './components/LocationSelector';

const Stack = createStackNavigator();

const App = () => {
  const [ready, setReady] = React.useState<boolean>(false);
  React.useEffect(() => {
    const initializer = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setReady(true);
    };
    initializer();
  }, []);
  if (!ready) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#68C2F3',
            shadowColor: 'transparent',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'MetaWeather Forecast' }}
        />
        <Stack.Screen
          name="Location"
          component={LocationSelector}
          options={{
            title: 'Select a location',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default registerRootComponent(App);
