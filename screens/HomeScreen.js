import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import axios from 'axios';
import ItemsPopular from '../components/ItemsPopular'
import ItemsResep from '../components/ItemsResep';





const HomeScreen = props => {

    const [resep, setResep] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filterResep, setFilterResep] = useState([]);


    useEffect(() => {
        setLoading(true);
        axios.get("https://my-json-server.typicode.com/azisaly/datajson-popular/Popular", { maxContentLength: 2000 })
            .then(response => {
                setResep(response.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, []);



    useEffect(() => {
        setFilterResep(
            resep.filter((reseps) =>
                reseps.title.toLowerCase().includes(search.toLowerCase())
            )

        );
    }, [search, resep]);










    let [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),

    });

    if (!fontsLoaded) {
        return <AppLoading />
    } else {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Semuanya</Text>
                    <Text style={styles.title2}>Bisa Jadi Koki.</Text>
                    <Image style={styles.imageLogo1} source={require('../assets/image/logochef.png')} />
                </View>

                <View style={styles.carausel}>
                    <Image style={{ width: 330, height: 240, resizeMode: 'cover', borderRadius: 5 }} source={require('../assets/image/jumbotron.jpg')} />
                </View>

                <View style={{ bottom: -7, marginTop: 15 }}>
                    <View style={{
                        width: "50%",
                    }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "bold"
                        }}>Menu Popular</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>


                            {filterResep.map((e, i) => {

                                return (
                                    <ItemsResep key={i} title={e.title} image={e.image} navigation={(id) => props.navigation.navigate('Details', { resepid: e.id, state: filterResep })} />
                                )

                            })}

                            {/* <ItemsPopular title="Opor Ayam" Image={require('../assets/food/opor.png')} />
                            <ItemsPopular title="Ayam kecap" Image={require('../assets/food/ayamKecap.jpg')} />
                            <ItemsPopular title="Daging Asap" Image={require('../assets/food/dagingAsap.jpg')} />
                            <ItemsPopular title="Soto Betawi" Image={require('../assets/food/soto-betawi.jpg')} />
                            <ItemsPopular title="Rawon Jawa" Image={require('../assets/food/rawon.jpeg')} /> */}
                        </View>
                    </ScrollView>
                </View>

            </View>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        paddingTop: 20,
    },

    header: {
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFF00',
        borderRadius: 10,
    },

    imageLogo1: {
        width: 120,
        height: 120,
        position: 'absolute',
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        right: -10,
        top: -10
    },

    imageLogo2: {
        width: 80,
        height: 80,
        position: 'absolute',
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        top: 30

    },

    title: {
        fontSize: 40,
        fontWeight: '800',
        fontFamily: 'Poppins-SemiBold',
        color: '#34281e',
        padding: 5
    },

    title2: {
        marginTop: -20,
        fontFamily: 'Poppins-SemiBold',
        color: '#34281e',
        marginLeft: 125

    },

    carausel: {
        height: 240,
        backgroundColor: '#E0CACA',
        marginTop: 8,
        borderRadius: 7
    }
})
