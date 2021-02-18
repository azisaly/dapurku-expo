import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, Dimensions, TouchableOpacity, LogBox } from 'react-native'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ScrollView } from 'react-native-gesture-handler';
import { TabActions } from '@react-navigation/native';



const Details = (props) => {



    const resepid = props.route.params?.resepid ?? null;
    const state = props.route.params?.state ?? null;
    const details = state.find((cat) => cat.id === resepid);
    const [dataFlatlist, setDataFlatlist] = useState(details.desc);
    const [dataBahan,setDataBahan] = useState(details.bahan);

    const jumpToAction = TabActions.jumpTo('Store');

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    let [fontsLoaded] = useFonts({
        // 'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        const renderItem = ({ item }) => {
            return (
                <Text style={{ fontFamily: 'Poppins-Regular' }}>{item}</Text>
            )
        }

        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.container} key={details.id}>
                        <Image style={styles.image} source={{ uri: details.image }} />
                        <Text style={styles.title}>{details.title}</Text>
                        


                        <Text style={styles.descTitle}>Cara Memasak :</Text>
                        <FlatList
                            data={dataFlatlist}
                            renderItem={renderItem}
                            keyExtractor={(index) => index}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={styles.descTitle}>Detail Bahan : </Text>
                        <FlatList
                            data={dataBahan}
                            renderItem={renderItem}
                            keyExtractor={(index) => index}
                            showsVerticalScrollIndicator={false}
                        />
                        <TouchableOpacity
                     style={styles.button}
                     onPress={()=>props.navigation.navigate('Store')}   
                        >
                        <Text style={styles.titleBtn}>BELI BAHAN</Text>
                    </TouchableOpacity>
                    </View>
                     
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    image: {
        width: 320,
        height: 250,
        borderRadius: 10
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
    },
    calory:{
        height:20,
        backgroundColor:'red'
    },
    descTitle: {
        marginTop:10,
        fontFamily: 'Poppins-Bold',
    },
    desc: {
        fontFamily: 'Poppins-Regular'
    },
    button:{
        marginTop:10,
        height:50,
        backgroundColor:'#DBF405',
        justifyContent:'center',
    alignItems:'center',
    display:'flex',
    borderRadius:10
    },
    titleBtn:{
    fontFamily: 'Poppins-Bold',
    }
})
