import { StyleSheet, Text, View, Image, ScrollView, FlatList, Linking, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Container, DetailImage, Typography, Colors, AvatarImage } from '../components/styles/style-sheet';
import StarRating from 'react-native-star-rating';
import { calculateAverageRating } from '../components/franchise-card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const DetailsScreen = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();
    const [weatherData, setWeatherData] = useState({});
    const [loader, setLoader] = useState(false);

    const MakeCall = (number) => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        }
        else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber)

    }

    const OpenEmail = (email) => {
        Linking.openURL(`mailto:?${email}`)
    }


    const weather = async (lat, lon) => {
        const API_KEY = '25e77929c145a7a1cca8d0468f2e98e8';
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            setTimeout(() => {
                setLoader(false);
                setWeatherData(response.data);
            }, 2000);
            setLoader(true);

        } catch (error) {
            Alert.alert(error)
        }
    }

    useEffect(() => {
        weather(item.map_address.latitude, item.map_address.longitude)
    }, [item])

    const temp = () => {
        const temperature = (Math.round(weatherData?.main?.temp - 273.15));
        return temperature
    }

    return (
        <View style={{ ...Container.mainContainer }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Image source={{ uri: item.image }} style={{ ...DetailImage }} />
                    <View style={styles.positionView}>
                        <Text style={{ ...Typography.medium }}>{item.code} ( {item?.category} )</Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={calculateAverageRating(item?.public_ratings)}
                            fullStarColor={"#FDCC0D"}
                            starSize={20}
                        />
                    </View>
                    <View style={styles.headingIconsView}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='arrow-back' size={24} onPress={() => navigation.goBack()} />
                        </TouchableOpacity>
                        <Feather name='edit-2' size={24} onPress={() => navigation.navigate("Edit", { currentItem: item })} style={{ paddingRight: 15, marginTop: 10 }} />
                    </View>
                </View>
                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.afterImageContent}>
                    <Text style={{ ...Typography.normal }}>Contact:</Text>
                    <TouchableOpacity style={styles.contactRows} onPress={() => MakeCall(item.contact.cell)}>
                        <Text style={{ ...Typography.small }}>Call</Text>
                        <Text style={{ ...Typography.small }}>{item?.contact?.cell}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { OpenEmail(item.contact.email) }}
                        style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Email</Text>
                        <Text style={{ ...Typography.small }}>{item?.contact?.email}</Text>
                    </TouchableOpacity>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Fax</Text>
                        <Text style={{ ...Typography.small }}>{item?.contact?.fax}</Text>
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Phone</Text>
                        <Text style={{ ...Typography.small }}>{item?.contact?.phone}</Text>
                    </View>
                </LinearGradient>
                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.afterImageContent}>
                    <Text style={{ ...Typography.normal }}>Address:</Text>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Street</Text>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ maxWidth: "50%", ...Typography.small }}>{item?.address?.street}</Text>
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>City</Text>
                        <Text style={{ ...Typography.small }}>{item?.address?.city}</Text>
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Zip Code</Text>
                        <Text style={{ ...Typography.small }}>{item?.address?.zip}</Text>
                    </View>
                </LinearGradient>
                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.afterImageContent}>
                    <Text style={{ ...Typography.normal }}>Working Hours:</Text>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Opening</Text>
                        <Text style={{ ...Typography.small }}>{item?.working_hours?.opening}</Text>
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Break Time</Text>
                        <Text style={{ ...Typography.small }}>{item?.working_hours?.break_time}</Text>
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Closing</Text>
                        <Text style={{ ...Typography.small }}>{item?.working_hours?.closing}</Text>
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Holiday</Text>
                        <Text style={{ ...Typography.small }}>{item?.working_hours?.holiday}</Text>
                    </View>
                </LinearGradient>
                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.afterImageContent}>
                    <View style={styles.managerView}>
                        <Text style={{ ...Typography.normal }}>Manager:</Text>
                        <Image
                            source={{ uri: item?.manager?.image }}
                            style={{ ...AvatarImage }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Name</Text>
                        <Text style={{ ...Typography.small }}>{item?.manager?.full_name}</Text>
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Email</Text>
                        <Text style={{ ...Typography.small }}>{item?.manager?.email}</Text>
                    </View>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Address</Text>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ maxWidth: "50%", ...Typography.small }}>{item?.manager?.address}</Text>
                    </View>
                    <View style={{ marginTop: "2%" }}>
                        <Text style={{ ...Typography.normal }}>Awards</Text>
                        {item.manager.awards?.map((item) => (
                            item.type === "gold" || item.type === "Gold" ?
                                <View style={[styles.contactRows, { alignItems: "center" }]}>
                                    <Text style={{ ...Typography.small }}>Gold</Text>
                                    <Text style={{ ...Typography.small }}>{item?.date}</Text>
                                    <View>
                                        <FontAwesome name='trophy' size={24} color={"#FDCC0D"} />
                                        <Text style={{ ...Typography.small }}>{item?.points}</Text>
                                    </View>
                                </View>
                                :
                                <View style={[styles.contactRows, { alignItems: "center" }]}>
                                    <Text style={{ ...Typography.small }}>Silver</Text>
                                    <Text style={{ ...Typography.small }}>{item?.date}</Text>
                                    <View>
                                        <FontAwesome name='trophy' size={24} color={"#C0C0C0"} />
                                        <Text style={{ ...Typography.small }}>{item?.points}</Text>
                                    </View>
                                </View>
                        ))}
                    </View>
                </LinearGradient>
                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.afterImageContent}>
                    <View>
                        <Text style={{ ...Typography.normal }}>Gallery:</Text>
                        <FlatList
                            horizontal
                            data={item?.gallery}
                            renderItem={(item1) => {
                                return (
                                    <TouchableOpacity style={styles.gallery} onPress={() => navigation.navigate("ImageModal", { item: item.gallery, current: item1.item })}>
                                        <Image source={{ uri: item1.item }} style={{ width: '100%', height: "100%", borderRadius: 7 }} />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </LinearGradient>
                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.afterImageContent}>
                    <Text style={{ ...Typography.normal }}>Awards:</Text>

                    {item.awards?.map((item) => (
                        item.type === "gold" || item.type === "Gold" ?
                            <View style={[styles.contactRows, { alignItems: "center" }]}>
                                <Text style={{ ...Typography.small }}>Gold</Text>
                                <Text style={{ ...Typography.small }}>{item?.date}</Text>
                                <View>
                                    <FontAwesome name='trophy' size={24} color={"#FDCC0D"} />
                                    <Text style={{ ...Typography.small }}>{item?.points}</Text>
                                </View>
                            </View>
                            :
                            <View style={[styles.contactRows, { alignItems: "center" }]}>
                                <Text style={{ ...Typography.small }}>Silver</Text>
                                <Text style={{ ...Typography.small }}>{item?.date}</Text>
                                <View>
                                    <FontAwesome name='trophy' size={24} color={"#C0C0C0"} />
                                    <Text style={{ ...Typography.small }}>{item?.points}</Text>
                                </View>
                            </View>
                    ))}
                </LinearGradient>
                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.afterImageContent}>
                    <Text style={{ ...Typography.normal }}>Weather:</Text>
                    <View style={styles.contactRows}>
                        <Text style={{ ...Typography.small }}>Current Weather</Text>
                        {loader ? <ActivityIndicator /> :
                            <Text style={{ ...Typography.small }}>{temp()}°C</Text>
                        }
                    </View>

                </LinearGradient>

            </ScrollView>
        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    afterImageContent: {
        marginTop: '1%',
        marginHorizontal: '2%',
        justifyContent: 'center',
        marginBottom: '2%',
        borderRadius: 7,
        backgroundColor: Colors.grey50,
        padding: '2%'

    },
    contactRows: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: '1%'
    },
    positionView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        position: 'absolute',
        top: 250,
        width: '100%',
        paddingHorizontal: '2%',
        backgroundColor: 'white',
        opacity: 0.5
    },
    managerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    gallery: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 7,
        marginTop: "2%",
        backgroundColor: 'red'
    },
    headingIconsView: {
        position: 'absolute',
        top: 30,
        left: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%'
    },
})