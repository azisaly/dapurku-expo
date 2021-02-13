import React from 'react';
import { View, Text, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';


const OnboardingScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),

    });

    if (!fontsLoaded) {
        return <AppLoading />
    } else {

        return (
            <Onboarding
                onSkip={() => navigation.navigate("BottomNavigator")}
                onDone={() => navigation.navigate("BottomNavigator")}
                pages={[
                    {
                        backgroundColor: '#fdeb93',
                        image: <Image source={require('../assets/image/onboarding1.png')} />,
                        title: 'Mau masak apa hari ini?',
                        titleStyles: { color: '#4A3F5E', fontFamily: 'Poppins-SemiBold', fontSize: 20 },
                        subtitle: '',

                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../assets/image/onboarding2.png')} />,
                        title: 'Banyak bahan tapi bingung?',
                        titleStyles: { color: 'red', fontFamily: 'Poppins-SemiBold', fontSize: 20 },
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#fdeb93',
                        image: <Image source={require('../assets/image/onboarding4.png')} />,
                        title: 'Yuk jelajahi menu bersama Dapurku',
                        titleStyles: { color: '#4A3F5E', fontFamily: 'Poppins-SemiBold', fontSize: 20 },
                        subtitle: '',
                    },

                ]}
            />
        )
    }
}

export default OnboardingScreen