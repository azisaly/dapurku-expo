import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { onboarding } from '../assets/index';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';



const GetCooking = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBoldItalic': require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),


    });

    if (!fontsLoaded) {
        return <AppLoading />
    } else {

        return (
            <View style={styles.container}>
                <View style={styles.containerMain}>
                    <Image style={{ width: 300, height: 300, resizeMode: 'stretch', }} source={onboarding} />
                    <Text style={styles.title}>Yukk Jelajahi Berbagai Menu</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('BottomNavigator')}><Text style={styles.titleBtn}>Get Cooking</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default GetCooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerMain: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        letterSpacing: 1
    },
    btn: {
        marginTop: 50,
        width: 250,
        height: 70,
        backgroundColor: '#FFFF00',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    titleBtn: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
        letterSpacing: 1
    }
})
