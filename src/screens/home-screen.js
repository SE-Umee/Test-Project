import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { infinity } from "../data/franchises"
import { Colors, Container, Typography } from '../components/styles/style-sheet';
import FranchiseCard from '../components/franchise-card';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import actionTypes from '../redux/action-types';
import { franchise } from '../redux/actions/franchise-action';
import notifee from '@notifee/react-native';
const HomeScreen = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");


    useEffect(() => {
        data = infinity.franchises.filter((item) => item.name === search);
    }, [search])

    useEffect(() => {
        dispatch(franchise(infinity.franchises, actionTypes.SHOW_ALL_FRANCHISE))
    }, [])
    useEffect(() => {
        onDisplayNotification()
    }, [])

    const onDisplayNotification = async () => {
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'custom_channel',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Local Notification',
            body: 'Main body content of my Local notification',
            android: {
                channelId,
            },
        });
    }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topView}>
                <Text style={styles.heading}>infinity</Text>
                <LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.searchBox}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearch}
                        value={search}
                        placeholder="Search Franchise"
                        placeholderTextColor={Colors.grey40}
                    />
                </LinearGradient>
            </View>

            <View style={styles.franchisesComponent}>
                <FranchiseCard
                    input={search}
                    setInput={setSearch}
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        ...Container.mainContainer,
    },
    topView: {
        flex: 0.15,
        paddingHorizontal: 10,
    },
    heading: {
        ...Typography.extraLarge,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 1,
    },
    searchBox: {
        width: '100%',
        backgroundColor: Colors.grey50,
        marginTop: "4%",
        borderRadius: 9,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 1,
    },
    input: {
        ...Typography.normal,
        borderWidth: 1,
        margin: "3%",
        borderRadius: 4,
        padding: '1%',
        borderColor: Colors.grey50

    },
    franchisesComponent: {
        flex: 0.85,
        paddingHorizontal: 10,
    },
    topBtnView: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    shortBtn: {
        borderWidth: 1,
        paddingHorizontal: "6%",
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    btnText: {
        ...Typography.normal
    },
})