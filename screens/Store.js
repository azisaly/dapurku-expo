import React from 'react';
import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import StoreCard from '../components/StoreCard';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { bukalapak, happyfresh, lumbungnusa, shoope, tokopedia, hypermart, segari, sayurbox } from '../assets/index';

const StoreMarket = props => {
    let [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Mitra Kami :</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.containerImage}>
                        <StoreCard image={happyfresh} toMarket={() => Linking.openURL('https://www.happyfresh.id/')} />
                        <StoreCard image={sayurbox} toMarket={() => Linking.openURL('https://www.sayurbox.com/')} />
                        <StoreCard image={segari} toMarket={() => Linking.openURL('https://segari.id/')} />
                        <StoreCard image={lumbungnusa} toMarket={() => Linking.openURL('https://lumbungnusa.com/')} />
                        <StoreCard image={bukalapak} toMarket={() => Linking.openURL('https://www.bukalapak.com/')} />
                        <StoreCard image={shoope} toMarket={() => Linking.openURL('https://shopee.co.id/search?keyword=vegetables')} />
                        <StoreCard image={tokopedia} toMarket={() => Linking.openURL('https://www.happyfresh.id/')} />
                        <StoreCard image={hypermart} toMarket={() => Linking.openURL('http://www.hypermart.co.id/')} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default StoreMarket

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 40,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold'
    },
    containerImage: {
        display: 'flex',
        padding: 20,
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
})
