import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

const StoreCard = props => {
    return (
        <TouchableOpacity style={styles.card} onPress={props.toMarket}>
            <Image style={styles.image} source={props.image} />
        </TouchableOpacity>
    )
}

export default StoreCard

const styles = StyleSheet.create({
    card: {
        height: 180,
        width: 150,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    image: {
        height: 180,
        width: 150,
        resizeMode: 'center',

    }
})
