import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Carousel from 'react-native-snap-carousel';
import { infinity } from '../data/franchises';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from './styles/style-sheet';
import { useNavigation } from '@react-navigation/native';
const ImageModal = ({ route }) => {
    const { item, current } = route.params;
    const navigation = useNavigation();
    const [firstItem, setFirstItem] = useState()

    useEffect(() => {
        index = item.findIndex(obj => obj === current);
        setFirstItem(index)
    }, [item, navigation, current])

    return (
        <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.mainContainer}>
            <Carousel
                data={item}
                firstItem={firstItem}
                renderItem={({ item }) =>
                    <View>
                        <Image source={{ uri: item }} style={{ height: "100%", width: "100%" }} resizeMode='cover' />
                    </View>
                }
                sliderWidth={400}
                itemWidth={400}
            />

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.close}>
                <LinearGradient colors={[Colors.search1, Colors.search2]} style={styles.close}>
                    <Text style={{ color: Colors.white }}>Close</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default ImageModal

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        width: "80%",
        height: "25%",
        marginBottom: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
})