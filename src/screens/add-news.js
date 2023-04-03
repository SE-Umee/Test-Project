import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors, Container, InputText } from '../components/styles/style-sheet';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import actionTypes from '../redux/action-types';
import { useSelector } from 'react-redux';
import { addingNews } from "../redux/actions/news-action"
import NewsCard from '../components/news-card';

const AddNews = () => {
    const dispatch = useDispatch();
    const allNews = useSelector(state => state.news.news)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState("");
    const selectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            response => {

                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                    Alert.alert(response.error.toString())
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    let source = response.assets[0].uri;
                    setImage(source);
                }

            },
        );

    }

    const submitNews = () => {
        if (title === "") {
            Alert.alert("Title Can't be empty")
        }
        else if (description === "") {
            Alert.alert("Description Can't be empty")
        }
        else if (image === "") {
            Alert.alert("Image Can't be empty")
        }
        else {
            let obj = {
                id: Math.random(),
                title: title,
                description: description,
                link: link,
                image: image
            }
            dispatch(addingNews(obj, actionTypes.ADD_NEWS))
            setTitle("")
            setDescription("")
            setLink("")
            setImage("")
        }

    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topView}>
                <Text style={{ fontSize: 30 }}>News</Text>
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Title :</Text>
                <TextInput
                    placeholder='Title'
                    value={title}
                    onChangeText={setTitle}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Description :</Text>
                <TextInput
                    placeholder='Description'
                    value={description}
                    onChangeText={setDescription}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Link :</Text>
                <TextInput
                    placeholder='https://google.com'
                    value={link}
                    onChangeText={setLink}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Image :  </Text>
                {!image ?
                    <TouchableOpacity
                        onPress={() => selectImage()}
                        style={styles.imageView}>
                        <Text style={{ alignSelf: 'center' }}>Pick</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.imageView} onPress={() => selectImage()}>
                        <Image source={{
                            uri: image
                        }}
                            style={{
                                height: 70,
                                width: 70,
                                borderRadius: 100
                            }} />
                    </TouchableOpacity>
                }
            </View>
            <TouchableOpacity style={styles.buttonText} onPress={() => submitNews()}>
                <Text>Add News</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                {allNews?.map((item) => <View style={{ padding: '2%' }}>
                    <NewsCard item={item} />
                </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddNews

const styles = StyleSheet.create({
    mainContainer: { ...Container.mainContainer },
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: '2%'
    },
    topView: {
        alignSelf: 'center',
        paddingVertical: '2%'
    },
    textInput: {
        ...InputText,
        width: '60%'
    },
    imageView: {
        height: 70,
        width: 70,
        backgroundColor: Colors.grey30,
        borderRadius: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: "2%"
    },
    buttonText: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
        paddingVertical: '2%',
        borderRadius: 8
    },

})