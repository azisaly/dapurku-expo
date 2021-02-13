import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import OnboardingScreen from '../screens/Onboarding';
import BottomNavigator from '../navigations/RouterTab'
import Details from '../components/Details';




const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="onboarding" component={OnboardingScreen} />
                <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
                <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router