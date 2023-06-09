import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Container } from '../components/styles/style-sheet'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const AdminScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ ...Container.mainContainer }}>
            <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.cardContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Entypo name='menu' size={24}
                        onPress={() => navigation.openDrawer()}
                        style={{ marginLeft: "2%" }}
                    />

                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <Text style={styles.text}>infinity</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateFranchise')}>
                            <Text style={{ color: Colors.white, fontWeight: "bold" }}>Create Franchise</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('News Stack')}>
                            <Text style={{ color: Colors.white, fontWeight: "bold" }}>Add News</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    )
}

export default AdminScreen

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
    },
    text: {
        fontSize: 50,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 1,
    },
    button: {
        paddingHorizontal: '2%'
    },

})