import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { logochef } from '../assets/index'

const SplashScreen = ({ navigation }) => {
    setTimeout(() => {
        navigation.replace('onboarding')
    }, 2000)

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Image style={{ width: 500, height: 500, resizeMode: 'center', }} source={logochef} />
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF00'
    },
    containerMain: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
