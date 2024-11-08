import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PageLogin from './screens/PageLogin';
import PageHome from './screens/PageHome';
import PageSignUp from './screens/PageSignUp';
import PageSignUpCar from './screens/PageSignUpCar';
import PageProfile from './screens/PageProfile';
import PageConfig from './screens/PageConfig';

import BottomNavBar from './components/BottomNavBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,  // Esconde o cabeçalho da parte superior
        tabBar: () => <BottomNavBar />  // Adiciona a BottomNavBar
      }}
    >
      <Tab.Screen name="Home" component={PageHome} />
      <Tab.Screen name="Profile" component={PageProfile} />
      <Tab.Screen name="Config" component={PageConfig} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageLogin">
        <Stack.Screen name="PageLogin" component={PageLogin} options={{ headerShown: false }} />
        <Stack.Screen name="PageSignUp" component={PageSignUp} options={{ headerShown: false }} />
        <Stack.Screen name="PageSignUpCar" component={PageSignUpCar} options={{ headerShown: false }} />
        
        {/* A navegação para as telas principais com a BottomNavBar */}
        <Stack.Screen name="PageHome" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="PageProfile" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="PageConfig" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}