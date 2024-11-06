import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageLogin from './screens/PageLogin';
import PageHome from './screens/PageHome'; // Certifique-se de que a importação está correta
import PageSignUp from './screens/PageSignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageLogin">
        <Stack.Screen name="PageLogin" component={PageLogin} options={{ headerShown: false }} />
        <Stack.Screen name="PageSignUp" component={PageSignUp} options={{ headerShown: false }} />
        <Stack.Screen name="PageHome" component={PageHome} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
