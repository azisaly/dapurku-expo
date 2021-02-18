import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Button, Image, ImageBackground } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import ItemsResep from '../components/ItemsResep';
import { LogoImage } from '../assets/index';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { decodeJpeg, fetch } from '@tensorflow/tfjs-react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';





const BooksMenu = (props, { initialProps }) => {
    const [resep, setResep] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filterResep, setFilterResep] = useState([]);
    const [shouldShow, setShouldShow] = useState(true);
    const [fokus, setFokus] = useState(false);

    const [isTfReady, setIsTfReady] = useState(false);
    const [isModelReady, setIsModelReady] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const [image, setImage] = useState(null);

    const jalanKanModelTf = async () => {
        await tf.ready();
        setIsTfReady(true);
        model = await mobilenet.load();
        setIsModelReady(true);
        getPermissionAsync();
    };
    const getPermissionAsync = async () => {
        if (Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry');
            };
        };
    };

    const classifyImage = async () => {
        try {
            const fileUri = image
            const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
            const raw = new Uint8Array(imgBuffer)
            const imageTensor = decodeJpeg(raw);
            const predictions = await model.classify(imageTensor);
            setPredictions(predictions);
            const data = predictions[0].className
            setSearch(data)
            console.log(predictions);



        } catch (error) {
            console.log(error);
        };
    };

    const selectImage = async () => {
        try {
            let response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (!response.cancelled) {
                const source = response.uri
                setImage(source);
                classifyImage();
            }
        } catch (error) {
            console.log(error);
        };
    };

    const renderPrediction = prediction => {
        return (
            <Text key={prediction.className} style={styles.text}>
                {prediction.className}
            </Text>
        );
    };
    useEffect(() => {
        jalanKanModelTf();
    }, []);

    //  ===================================================== End Tensorflow =============================================================================

    useEffect(() => {
        setLoading(true);
        axios.get("http://my-json-server.typicode.com/azisaly/dummydatadapurku/resep", { maxContentLength: 2000 })
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
                    <TextInput placeholder="Search" onChangeText={(text) => {
                        setSearch(text)
                    }} />
                </View>
            </View>



            <TouchableOpacity style={styles.imageWrapper} onPress={isModelReady ? selectImage : undefined}>
                <ImageBackground
                    source={LogoImage}
                    style={{
                        height: 200,
                        width: 200,
                        opacity: 0.20,
                        position: 'absolute',
                    }}
                />
                {image && <Image source={{ uri: image }} style={styles.imageContainer} />}
                {isModelReady && !image && (
                    <Text style={styles.transparentText}>
                        explore by picture</Text>
                )}
            </TouchableOpacity>

            <View style={styles.predictionWrapper}>
                {/* {isModelReady && image && (
                    <Text style={styles.text}>Predictionss : { predictions ? '' : 'Predicting'}</Text>
                )} */}
                {isModelReady && predictions && predictions.map((p, index) => {
                    console.log(`${p}, ${index}`)
                })}
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
    imageWrapper: {
        height: 250,
        borderColor: '#cf667f',
        display: 'flex',
        marginBottom: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',


    },
    imageContainer: {
        width: 250,
        height: 250,
    },

    containerImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        marginBottom: 10

    },
    transparentText: {
        color: '#0A011C',
        fontWeight: 'bold'
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
