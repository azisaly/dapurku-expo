import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import OnboardingScreen from '../screens/Onboarding';
import BottomNavigator from '../navigations/RouterTab'
import Details from '../components/Details';
import StoreMarket from '../screens/Store';
import SplashScreen from '../screens/SplashScreen';
import GetCooking from '../screens/GetCooking';




const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="spalsh" component={SplashScreen} />
                <Stack.Screen name="onboarding" component={GetCooking} />
                <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="Store" component={StoreMarket} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router