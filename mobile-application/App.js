import { StatusBar } from 'expo-status-bar';
import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Text,
    BackHandler,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import database from '@react-native-firebase/database';
import { db } from './config';
import { ref, set, update } from 'firebase/database';

export default function App() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState();
    const [lat, setLat] = useState('*****');
    const [long, setLong] = useState('*****');
    const [regNo, setRegNo] = useState('');

    // firebase code
    const addDataToDB = () => {
        update(
            ref(db, 'Students/' + regNo),
            {
                lat: lat,
                long: long,
            },
            { merge: true }
        )
            .then(() => {
                console.log('Data Updated in Database');
            })
            .catch(error => {
                console.log('Error Updating Data:', error);
            });
    };
    // firebase code

    Location.setGoogleApiKey('AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg');

    let currentLocation;

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Please grant location permissions');
                return;
            }

            currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log('Current Location:');
            console.log(currentLocation);
        };
        getPermissions();
    }, []);

    shutdownApp = () => {
        setRegNo('');
        BackHandler.exitApp();
    };

    showAlert = () => {
        Alert.alert(
            `Hi ${regNo}!!`,
            'Your Attendance Has Been Registered!! \n\nStudy Hard!!',
            [
                {
                    text: 'Ok',
                    onPress: () => shutdownApp(),
                    style: 'OK',
                },
            ]
        );
    };

    const showLocation = () => {
        setLat(location.coords.latitude);
        setLong(location.coords.longitude);
    };

    const showResult = () => {
        if (regNo == '') {
            Alert.alert(
                `Hi User`,
                'Please Enter Your Register Number To Mark Your Attendance!!',
                [
                    {
                        text: 'Ok',
                        style: 'OK',
                    },
                ]
            );
        } else if (regNo.length != 12) {
            Alert.alert(
                `Hi User`,
                'Please Enter Your Complete Register Number To Mark Your Attendance!!',
                [
                    {
                        text: 'Ok',
                        style: 'OK',
                    },
                ]
            );
        } else if (lat == '*****' || long == '*****') {
            Alert.alert(
                `Hi User`,
                'Please Click On The Show Co-Ordinates Button To Reveal Your Location!!',
                [
                    {
                        text: 'Ok',
                        style: 'OK',
                    },
                ]
            );
        } else {
            console.log('Uploading Data To Server');
            console.log('User: ', regNo);
            console.log('Latitude: ', lat);
            console.log('Longitude: ', long);
            addDataToDB();
            showAlert();
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}> Attendance Monitoring System</Text>
            </View>
            <View style={styles.coordinatesBox}>
                <Text className='currLongitude' style={styles.LongLat}>
                    Latitude: {lat}
                </Text>
                <Text className='currLongitude' style={styles.LongLat}>
                    Longitude: {long}
                </Text>
            </View>
            <View>
                <Button title='Show Co-Ordinates' onPress={showLocation} />
            </View>
            <View>
                <Text style={styles.inputText}>
                    Enter Your Register Number:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setRegNo}
                    value={regNo}
                    placeholder='useless placeholder'
                    keyboardType='numeric'
                />
            </View>
            <View>
                <Button title='Send Location' onPress={showResult} />
            </View>

            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 25,
        paddingBottom: 25,
        backgroundColor: '#000000',
    },
    title: {
        fontSize: 45,
        textAlign: 'center',
        color: 'white',
    },
    location: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    LongLat: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        color: '#ffff',
        borderColor: '#ffff',
    },
    inputText: {
        color: '#ffff',
    },
    Button: {
        backgroundColor: 'black',
    },
});
