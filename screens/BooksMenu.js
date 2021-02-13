import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, Button, Image, ImageBackground } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import ItemsResep from '../components/ItemsResep';
import { LogoImage } from '../assets/index'




const BooksMenu = (props, { initialProps }) => {
    const [resep, setResep] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filterResep, setFilterResep] = useState([]);
    const [shouldShow, setShouldShow] = useState(true);
    const [fokus, setFokus] = useState(false)
    const [image, setImage] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get("http://my-json-server.typicode.com/azisaly/dummydatadapurku/resep")
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

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput placeholder="Cari Menu Kesukaanmu" onChangeText={(text) => {
                        setSearch(text)
                    }} />
                </View>
            </View>




            <Button title="Jelajahi Dengan Gambar" style={{ display: 'flex' }} onPress={pickImage} />

            <View style={styles.containerImage}>
                <ImageBackground source={LogoImage} style={styles.camera}>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, display: 'flex' }} />}
                </ImageBackground>
            </View>



            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 2 }}>
                <View style={styles.conatainerResep}>
                    {filterResep.map((e, i) => {

                        return (
                            <ItemsResep key={i} title={e.title} image={e.image} navigation={(id) => props.navigation.navigate('Details', { resepid: e.id, state: filterResep })} />
                        )

                    })}

                </View >
            </ScrollView>

        </View>
    )
}

export default BooksMenu

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        paddingTop: 20,
        justifyContent: 'center'

    },
    header: {
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#C1D00D',
        height: 'auto',
        width: 70,
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 20,
        flexDirection: 'column'
    },

    btnTitle: {
        color: '#0E416B',
        fontWeight: "bold"
    },

    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#41423f',
        textAlign: 'center',
        display: 'flex',
        marginLeft: 100,
        marginBottom: -20
    },
    search: {
        width: '100%',
        height: 50,
        backgroundColor: '#F7F1F1',
        marginTop: 5,
        borderRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },


    containerImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        marginBottom: 10

    },
    camera: {
        width: 200,
        height: 200,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,


    },

    jelajahi: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    // cam: {
    //     flex: 2,
    //     width: '100%',
    //     height: '50%'

    // },
    titleResep: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 20,
        color: 'black',
        marginBottom: 10,
        fontWeight: 'bold'
    },


    conatainerResep: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1

    }
})
