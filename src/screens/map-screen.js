import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform, FlatList, Image } from 'react-native'
import React, { useRef, useState, useEffect, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Colors, Container, Typography } from '../components/styles/style-sheet';
import { infinity } from '../data/franchises';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const MapScreen = ({ route }) => {
    const allFranchises = useSelector(state => state.franchise.franchises);
    const { item } = route.params;
    console.log('====================================');
    console.log(item);
    console.log('====================================');
    const navigation = useNavigation();
    const [cLatitude, setCLatitude] = useState();
    const [cLongitude, setCLongitude] = useState();
    const [region, setRegion] = useState();
    const [currentItem, setCurrentItem] = useState();
    const [currentMarker, setCurrentMarker] = useState(0);
    const window = Dimensions.get('window');
    const { width, height } = window
    const LATITUDE_DELTA = 10;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height)
    const INITIAL_POSITION = {
        latitude: 30.375320,
        longitude: 69.345116,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }
    const refMap = useRef(null);


    const handleSnapToItem = (index) => {
        setCurrentItem(infinity.franchises[index])
    }


    useEffect(() => {
        onRegionChange()
    }, [currentItem])



    const onRegionChange = () => {
        setRegion({
            latitude: currentItem?.map_address?.latitude,
            longitude: currentItem?.map_address?.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
        });
        setCLatitude(currentItem?.map_address.latitude)
        setCLongitude(currentItem?.map_address.longitude)
    }

    useEffect(() => {
        setCLatitude(item.map_address.latitude)
        setCLongitude(item.map_address.longitude)
    }, []);

    const onMarkerClick = (item) => {
        setCLatitude(item.map_address.latitude);
        setCLongitude(item.map_address.longitude);
        index = infinity.franchises.findIndex(x => x._id === item._id);
        setCurrentMarker(index);
    }

    const onZoomInPress = () => {
        refMap.current?.getCamera().then((cam) => {
            if (Platform.OS === 'android') {
                cam.zoom += 1;
            } else {
                cam.altitude /= 2;
            }
            refMap.current?.animateCamera(cam);
        });
    };

    const onZoomOutPress = () => {
        refMap.current?.getCamera().then((cam) => {
            if (Platform.OS === 'android') {
                cam.zoom -= 1;
            } else {
                cam.altitude *= 3;
            }
            refMap.current?.animateCamera(cam);
        });
    };


    useEffect(() => {
        setTimeout(() => {
            if (currentItem === undefined) {
                setRegion({
                    latitude: cLatitude,
                    longitude: cLongitude,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                });
            }
        }, 200);
    }, [item, cLatitude, cLongitude,]);

    return (
        <View style={{ ...Container.mainContainer }}>
            <MapView
                ref={refMap}
                initialRegion={INITIAL_POSITION}
                region={region}
                zoomEnabled={true}
                zoomControlEnabled={false}
                style={styles.map}
                onRegionChange={region => setRegion(region)}
            >
                {infinity.franchises.map((item) => {
                    if (cLatitude == item.map_address.latitude && cLongitude == item.map_address.longitude) {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: item.map_address.latitude,
                                    longitude: item.map_address.longitude
                                }}
                            >
                                <View>
                                    <MaterialCommunityIcons name='map-marker' size={50} color="red" />
                                </View>
                            </Marker>
                        )
                    } else {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: item.map_address.latitude,
                                    longitude: item.map_address.longitude
                                }}
                                onPress={() => onMarkerClick(item)}
                            >
                                <View>
                                    <MaterialCommunityIcons name='map-marker' size={30} color={Colors.green10} />
                                </View>
                            </Marker>
                        )
                    }

                }
                )
                }
            </MapView>
            <LinearGradient colors={[Colors.search1, Colors.search2]} style={styles.zoomView}>
                <TouchableOpacity onPress={() => onZoomInPress()}>
                    <Text style={styles.zoomButton}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onZoomOutPress()}>
                    <Text style={styles.zoomButton}>-</Text>
                </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 30, left: 10 }}>
                <Ionicons name='arrow-back' size={24} />
            </TouchableOpacity>
            <View style={{ flex: 0.15 }}>
                <Carousel
                    data={allFranchises}
                    firstItem={currentMarker}
                    renderItem={({ item }) =>
                        <LinearGradient colors={[Colors.lg1, Colors.lg2]} style={styles.franchiseContainer}>
                            <Text style={{ ...Typography.normal, alignSelf: 'center' }}>{item?.code} ({item?.category})</Text>
                            <View style={styles.contactRows}>
                                <Text>Call : </Text>
                                <Text>{item?.contact?.cell}</Text>
                            </View>
                            <View style={styles.contactRows}>
                                <Text>Email : </Text>
                                <Text>{item?.contact?.email}</Text>
                            </View>
                            <View style={styles.contactRows}>
                                <Text>City : </Text>
                                <Text>{item?.address?.city}</Text>
                            </View>
                        </LinearGradient>
                    }
                    sliderWidth={400}
                    itemWidth={350}
                    onSnapToItem={handleSnapToItem}
                />

            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    map: {
        flex: 0.85
    },
    zoomView: {
        position: 'absolute',
        top: 100,
        left: 20,
        height: '10%',
        backgroundColor: 'red',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '5%',
        borderRadius: 7,
    },
    zoomButton: {
        fontSize: 24,
        color: '#fff'
    },
    bottomView: {
        flex: 0.15,
        paddingHorizontal: '2%',
        paddingTop: '2%',
        backgroundColor: 'red'
    },
    contactRows: {
        flexDirection: "row",
        justifyContent: 'center'
    },
    franchiseContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 1,
        paddingVertical: 10,

    },
})