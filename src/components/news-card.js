import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Colors, Container, Typography } from './styles/style-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const NewsCard = ({ item }) => {
    const navigation = useNavigation();
    handleClick = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };
    return (
        <View>
            <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.mainContainer} >
                <View style={styles.innerMainView}>
                    <View style={styles.leftView}>
                        <Text style={{ ...Typography.medium }}>{item.title}</Text>
                        <Text ellipsizeMode='tail' numberOfLines={3} style={{ maxWidth: "95%" }}>{item.description}</Text>
                        <TouchableOpacity onPress={() => handleClick(item.link)}>
                            <Text style={styles.linkText}>{item.link}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightView}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Feather
                            name='edit-2'
                            size={20}
                            color={Colors.grey50}
                            onPress={() => navigation.navigate("EditNews", { item })}
                            style={{ position: 'absolute', right: 5, top: 3 }}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default NewsCard

const styles = StyleSheet.create({
    mainContainer: {
        ...Container.mainContainer,
        width: "100%",
        height: 120,
        borderRadius: 7,

    },
    innerMainView: {
        width: '100%',
        flexDirection: 'row'
    },
    leftView: {
        width: '70%',
        paddingVertical: '2%',
        paddingLeft: "2%",
    },
    rightView: {
        width: '30%',
    },
    image: {
        width: '100%',
        height: "100%"
    },
    linkText: {
        ...Typography.small,
        color: 'green',
        textDecorationLine: 'underline',
        marginTop: '2%'
    }
})