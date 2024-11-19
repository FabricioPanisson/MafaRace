import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-url-polyfill/auto';

import PageLogin from './screens/PageLogin';
import PageHome from './screens/PageHome';
import PageSignUp from './screens/PageSignUp';
import PageSignUpCar from './screens/PageSignUpCar';
import PageSignUpRace from './screens/PageSignUpRace';
import PageProfile from './screens/PageProfile';
import PageEvent from './screens/PageEvent';
import PageConfig from './screens/PageConfig';

import BottomNavBar from './components/BottomNavBar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageLogin">
        <Stack.Screen name="PageLogin" component={PageLogin} options={{ headerShown: false }} />
        <Stack.Screen name="PageSignUp" component={PageSignUp} options={{ headerShown: false }} />
        <Stack.Screen name="PageSignUpCar" component={PageSignUpCar} options={{ headerShown: false }} />

        {/* Adicionando BottomNavBar nas páginas principais */}
        <Stack.Screen 
          name="PageSignUpRace" 
          component={PageSignUpRace} 
          options={{
            headerShown: false,
            tabBar: () => <BottomNavBar /> // Barra personalizada para a página Cadastro de racha 
          }} 
        />
        <Stack.Screen 
          name="PageHome" 
          component={PageHome} 
          options={{
            headerShown: false,
            tabBar: () => <BottomNavBar /> // Barra personalizada para a página Home
          }} 
        />
        <Stack.Screen 
          name="PageProfile" 
          component={PageProfile} 
          options={{
            headerShown: false,
            tabBar: () => <BottomNavBar /> // Barra personalizada para a página Profile
          }} 
        />
        <Stack.Screen 
          name="PageEvent" 
          component={PageEvent} 
          options={{
            headerShown: false,
            tabBar: () => <BottomNavBar /> // Barra personalizada para a página Ranking
          }} 
        />
        <Stack.Screen 
          name="PageConfig" 
          component={PageConfig} 
          options={{
            headerShown: false,
            tabBar: () => <BottomNavBar /> // Barra personalizada para a página Config
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
