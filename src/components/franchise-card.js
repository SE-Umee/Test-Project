import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { CardImage, Colors, Container, Typography } from './styles/style-sheet';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import StarRating from 'react-native-star-rating';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';



const FranchiseCard = ({ input }) => {
    const allFranchises = useSelector(state => state.franchise.franchises);
    const navigation = useNavigation();
    const isFranchiseOpen = (openingTime, closingTime) => {
        // current Time 
        var time = new Date();
        const currentTime = time.toLocaleString('en-US', { hour: "2-digit", minute: "2-digit", hour12: true })
        const currentT = new Date(`01/01/1970 ${currentTime}`);
        const current = currentT.getTime();

        //opening Time
        const openTime = new Date(`01/01/1970 ${openingTime}`);
        const opening = openTime.getTime();

        //close Time
        const closeTime = new Date(`01/01/1970 ${closingTime}`);
        const closing = closeTime.getTime();

        if (opening < current && current < closing) {
            return (
                <Text style={{ color: Colors.green10 }}>Opened</Text>
            )
        }
        else {
            return (
                <Text style={{ color: Colors.red10 }}>Closed Now</Text>
            )
        }

    }

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={allFranchises}
                renderItem={({ item }) => {
                    if (input === "") {
                        return (

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Detail", { item })}
                                style={styles.container}>
                                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.contentView}>
                                    <View>
                                        <Image source={{ uri: item?.image }}
                                            style={styles.cardImage}
                                        />
                                    </View>
                                    <View style={styles.detailsView}>
                                        <Text style={styles.province}>{item?.code} ( {item?.category} )</Text>
                                        <Text style={[{ ...Typography.normal }, { color: Colors.orange10 }]}>{item.province}</Text>
                                        <View style={{ position: 'absolute', bottom: 2, left: 3, right: 3 }}>
                                            <View style={styles.locationWithRaging}>
                                                <EvilIcons name='location' size={30} color={Colors.green10} onPress={() => navigation.navigate('Map', { item })} />
                                                <View style={styles.rating}>
                                                    <StarRating
                                                        disabled={true}
                                                        maxStars={5}
                                                        rating={calculateAverageRating(item?.public_ratings)}
                                                        fullStarColor={"#FDCC0D"}
                                                        starSize={15}
                                                    />
                                                    <Text style={{ fontWeight: '400', color: Colors.orange10 }}> ({calculateAverageRating(item.public_ratings).toFixed(1)})</Text>
                                                </View>

                                            </View>
                                            <View style={styles.openOrCloseText}>
                                                {isFranchiseOpen(item?.working_hours?.opening, item?.working_hours?.closing)}
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    }

                    if (item.code.toLowerCase().includes(input.toLowerCase())) {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Detail", { item })}
                                style={styles.container}>
                                <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.contentView}>
                                    <View>
                                        <Image source={{ uri: item.image }}
                                            style={styles.cardImage}
                                        />
                                    </View>
                                    <View style={styles.detailsView}>
                                        <Text style={styles.province}>{item.code} ( {item.category} )</Text>
                                        <Text style={[{ ...Typography.normal }, { color: Colors.orange10 }]}>{item.province}</Text>
                                        <View style={{ position: 'absolute', bottom: 2, left: 3, right: 3 }}>
                                            <View style={styles.locationWithRaging}>
                                                <EvilIcons name='location' size={30} color={Colors.green10} onPress={() => navigation.navigate('Map', { item })} />
                                                <View style={styles.rating}>
                                                    <StarRating
                                                        disabled={true}
                                                        maxStars={5}
                                                        rating={calculateAverageRating(item.public_ratings)}
                                                        fullStarColor={"#FDCC0D"}
                                                        starSize={15}
                                                    />
                                                    <Text style={{ fontWeight: '400', color: Colors.orange10 }}> ({calculateAverageRating(item.public_ratings).toFixed(1)})</Text>
                                                </View>

                                            </View>
                                            <View style={styles.openOrCloseText}>
                                                {isFranchiseOpen(item.working_hours.opening, item.working_hours.closing)}
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        </View>
    )
}

export default FranchiseCard

export const calculateAverageRating = (ratings) => {
    let totalRating = 0;
    const numRatings = ratings?.length;

    ratings?.forEach((rating) => {
        totalRating += parseFloat(rating.rating);
    });

    const averageRating = totalRating / numRatings;
    return averageRating;
}

const styles = StyleSheet.create({
    container: {
        ...Container.mainContainer,
        marginVertical: '2%',
        borderRadius: 7,
    },
    cardImage: {
        height: CardImage.height,
        width: CardImage.width,
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7
    },
    contentView: {
        flexDirection: "row",
        borderRadius: 7
    },
    province: {
        ...Typography.medium
    },
    detailsView: {
        paddingTop: "2%",
        paddingHorizontal: '2%',
        width: '72%',
    },
    buttonView: {
        justifyContent: 'space-between',
    },
    locationWithRaging: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    openOrCloseText: {
        alignSelf: 'flex-end'
    },
})