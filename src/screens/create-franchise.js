import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Colors, Container, InputText, Typography } from '../components/styles/style-sheet'
import LinearGradient from 'react-native-linear-gradient'
import SelectDropdown from 'react-native-select-dropdown'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary, openPicker } from 'react-native-image-picker';
import { useDispatch } from 'react-redux'
import actionTypes from '../redux/action-types'
import { franchise } from '../redux/actions/franchise-action'
import MapView, { Marker } from 'react-native-maps'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const CreateFranchise = () => {
    const dispatch = useDispatch();

    const navigation = useNavigation()

    const [branchCode, setBranchCode] = useState("");
    const [category, setCategory] = useState("");
    const [employees, setEmployees] = useState("");
    const [province, setProvince] = useState("");
    const [openingData, setOpeningData] = useState("");
    const [franchiseImage, setFranchiseImage] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [call, setCall] = useState("");
    const [phone, setPhone] = useState("");
    const [fax, setFax] = useState("");
    const [email, setEmail] = useState("");
    const [opening, setOpening] = useState("");
    const [closing, setClosing] = useState("");
    const [breakTime, setBreakTime] = useState("");
    const [holiday, setHoliday] = useState("");
    const [awards, setAwards] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [mapAddress, setMapAddress] = useState({});
    const [addManager, setAddManager] = useState(false);
    const [managerName, setManagerName] = useState("");
    const [managerEmail, setManagerEmail] = useState("");
    const [managerImage, setManagerImage] = useState("");
    const [managerAddress, setManagerAddress] = useState("");
    const [managerAwards, setManagerAwards] = useState([]);
    const [managerPermanentAddress, setManagerPermanentAddress] = useState("");
    const [dob, setDOB] = useState("");
    const [domicile, setDomicile] = useState("");
    const [managerJoiningDate, setManagerJoiningDate] = useState("");
    const [addLocation, setAddLocation] = useState(false)
    const relative = ["Punjab ", "KPK", "Sindh", "Balochistan", "Gilgit-Baltistan"];


    const refMap = useRef(null);
    const [region, setRegion] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
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

    useEffect(() => {
        {
            region === undefined ? (
                setLatitude(INITIAL_POSITION.latitude),
                setLongitude(INITIAL_POSITION.longitude)
            )
                : (
                    setLatitude(region.latitude),
                    setLongitude(region.longitude)
                )
        }
    }, [region])

    const CancelManager = () => {
        setManagerName("")
        setManagerEmail("")
        setManagerAddress("")
        setManagerPermanentAddress("")
        setDOB("")
        setDomicile("")
        setManagerJoiningDate("")
    }
    // ====================================images====================================


    const selectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                // includeBase64: false,
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
                    setFranchiseImage(source);
                }

            },
        );

    }

    const selectManagerImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                // includeBase64: false,
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
                    setManagerImage(source);
                }

            },
        );

    }


    const GalleryImages = async () => {
        await launchImageLibrary(
            {
                mediaType: 'photo',
            },
            response => {

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    let results = [];
                    response.assets.forEach(imageInfo => results.push(imageInfo.uri));
                    setGallery([...results, ...gallery]);
                }
            },
        );

        return (
            Alert.alert('Image Added')
        )
    }
    // ====================================Image====================================
    let address = {
        street: street,
        city: city,
        zip: zip
    }
    let contact = {
        cell: call,
        phone: phone,
        fax: fax,
        email: email
    }
    let manager = {
        full_name: managerName,
        email: managerEmail,
        address: managerAddress,
        awards: managerAwards,
        image: managerImage,
        permanent_address: managerPermanentAddress,
        dob: dob,
        domicile: domicile,
        joining_date: managerJoiningDate,
    }
    let WorkingHours = {
        opening: opening,
        closing: closing,
        break_time: breakTime,
        holiday: holiday
    }
    const createFranchise = () => {
        let obj = {
            code: branchCode,
            category: category,
            num_employees: employees,
            province: province,
            image: franchiseImage,
            opening_date: openingData,
            address: address,
            map_address: mapAddress,
            contact: contact,
            manager: manager,
            awards: awards,
            gallery: gallery,
            working_hours: WorkingHours
        }
        dispatch(franchise(obj, actionTypes.ADD_NEW_FRANCHISE))

    }


    const AddLocation = () => {
        setMapAddress({
            latitude: latitude,
            longitude: longitude
        })

        setAddLocation(false)
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.mainContainer}>
                <ScrollView
                    contentContainerStyle={styles.ScrollView}
                    showsVerticalScrollIndicator='false'
                >
                    <View>
                        <LinearGradient colors={[Colors.lg2, Colors.lg1]}>
                            <Text style={styles.headingText}>Basic info *</Text>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={branchCode}
                                    placeholder='Branch Code'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setBranchCode}
                                    keyboardType="number-pad"
                                    style={{ ...InputText }}
                                />
                                <TextInput
                                    value={category}
                                    placeholder='Branch Category'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setCategory}
                                    style={{ ...InputText }}
                                />
                            </View>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={employees}
                                    placeholder='Number of Employee'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setEmployees}
                                    style={{ ...InputText }}
                                    keyboardType="number-pad"
                                />
                                <SelectDropdown
                                    defaultButtonText={"Select Province"}
                                    data={relative}
                                    buttonStyle={styles.dropDown}
                                    renderDropdownIcon={() => <AntDesign name='down' size={18} />
                                    }
                                    onSelect={(selectedItem, index) => {
                                        setProvince(selectedItem)
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: '2%', justifyContent: "space-between", alignItems: 'center' }}>
                                <TextInput
                                    value={openingData}
                                    placeholder='Branch Opening Data'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setOpeningData}
                                    style={{ ...InputText }}
                                    keyboardType="number-pad"
                                />
                                <View>
                                    {/* <Text>Upload Image</Text> */}
                                    {!franchiseImage ?
                                        <TouchableOpacity
                                            onPress={() => selectImage()}
                                            style={styles.imageView}>
                                            <Text>Click</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={styles.imageView}>
                                            <Image source={{
                                                uri: franchiseImage
                                            }}
                                                style={{
                                                    height: 70,
                                                    width: 70,
                                                    borderRadius: 100
                                                }} />
                                        </View>
                                    }
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={{ backgroundColor: 'red', paddingBottom: 0, marginBottom: 0 }}>
                        <LinearGradient colors={[Colors.lg2, Colors.lg1]}>
                            <Text style={styles.headingText}>Address *</Text>
                            <TextInput
                                value={street}
                                placeholder='Branch street Address'
                                placeholderTextColor={Colors.grey20}
                                onChangeText={setStreet}
                                style={{ ...InputText }}
                            />
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={city}
                                    placeholder='Branch City'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setCity}
                                    style={{ ...InputText }}
                                />
                                <TextInput
                                    value={zip}
                                    placeholder='Branch Zip Code'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setZip}
                                    style={{ ...InputText }}
                                    keyboardType="number-pad"
                                />
                            </View>
                            <TouchableOpacity onPress={() => { setAddLocation(true) }}>
                                <Text style={styles.addManager}>Add Location</Text>
                            </TouchableOpacity>
                            {addLocation ?
                                <View style={{ maxHeight: 300, maxWidth: "100%", }}>
                                    <View style={styles.inPutView}>
                                        <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center" }}>
                                            <Text>Lati:</Text>
                                            <Text style={{ ...InputText, paddingHorizontal: 0 }}>{latitude}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center" }}>
                                            <Text>Long:</Text>
                                            <Text style={{ ...InputText, paddingHorizontal: 0 }}>{longitude}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{ alignSelf: 'center', margin: "2%" }} onPress={() => AddLocation()}>
                                        <Text style={styles.addManager}>Add Location</Text>
                                    </TouchableOpacity>
                                    <MapView
                                        ref={refMap}
                                        initialRegion={INITIAL_POSITION}
                                        region={region}
                                        zoomEnabled={true}
                                        zoomControlEnabled={false}
                                        style={styles.map}
                                        onRegionChange={region => setRegion(region)}
                                    >
                                        <Marker
                                            coordinate={{
                                                latitude: latitude,
                                                longitude: longitude
                                            }}
                                        >
                                            <View>
                                                <MaterialCommunityIcons name='map-marker' size={30} color={Colors.green10} />
                                            </View>
                                        </Marker>
                                    </MapView>
                                </View>
                                : <></>}
                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient colors={[Colors.lg2, Colors.lg1]}>
                            <Text style={styles.headingText}>Contact *</Text>
                            <TextInput
                                value={call}
                                placeholder='Branch Call number'
                                placeholderTextColor={Colors.grey20}
                                onChangeText={setCall}
                                style={{ ...InputText }}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                value={phone}
                                placeholder='Branch Phone number'
                                placeholderTextColor={Colors.grey20}
                                onChangeText={setPhone}
                                style={{ ...InputText }}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                value={fax}
                                placeholder='Branch Fax number'
                                placeholderTextColor={Colors.grey20}
                                onChangeText={setFax}
                                style={{ ...InputText }}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                value={email}
                                placeholder='Branch Email Address'
                                placeholderTextColor={Colors.grey20}
                                onChangeText={setEmail}
                                style={{ ...InputText }}
                                keyboardType="email-address"
                            />
                        </LinearGradient>
                    </View>

                    {!addManager ?
                        <TouchableOpacity onPress={() => {
                            setAddManager(true)
                        }}>
                            <Text style={styles.addManager}>Add Manager</Text>
                        </TouchableOpacity>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.addManager}>Add Manager </Text>
                            <TouchableOpacity onPress={() => {
                                CancelManager()
                                setAddManager(false)
                            }}>
                                <Text style={[styles.headingText, { fontWeight: 'bold' }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {addManager ?
                        <View>
                            <LinearGradient colors={[Colors.lg2, Colors.lg1]}>
                                <View style={{ flexDirection: 'row', margin: '2%', justifyContent: "space-between", alignItems: 'center' }}>
                                    <TextInput
                                        value={managerName}
                                        placeholder='Branch Manager Name'
                                        placeholderTextColor={Colors.grey20}
                                        onChangeText={setManagerName}
                                        style={{ ...InputText }}
                                    />
                                    <View>
                                        {/* <Text>Upload Image</Text> */}
                                        {!managerImage ?
                                            <TouchableOpacity
                                                onPress={() => selectManagerImage()}
                                                style={styles.imageView}>
                                                <Text>Click</Text>
                                            </TouchableOpacity>
                                            :
                                            <View style={styles.imageView}>
                                                <Image source={{
                                                    uri: managerImage
                                                }}
                                                    style={{
                                                        height: 70,
                                                        width: 70,
                                                        borderRadius: 100
                                                    }} />
                                            </View>
                                        }
                                    </View>
                                </View>
                                <TextInput
                                    value={managerEmail}
                                    placeholder='Branch Manager Email Address'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setManagerEmail}
                                    style={{ ...InputText }}
                                />
                                <TextInput
                                    value={managerAddress}
                                    placeholder='Branch Manager Current Address'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setManagerAddress}
                                    style={{ ...InputText }}
                                />
                                <TextInput
                                    value={managerPermanentAddress}
                                    placeholder='Branch Manager Permanent Address'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setManagerPermanentAddress}
                                    style={{ ...InputText }}
                                />
                                <View style={styles.inPutView}>
                                    <TextInput
                                        value={dob}
                                        placeholder='Branch Manager DOB'
                                        placeholderTextColor={Colors.grey20}
                                        onChangeText={setDOB}
                                        style={{ ...InputText }}
                                    />
                                    <TextInput
                                        value={domicile}
                                        placeholder='Branch Manager Domicile'
                                        placeholderTextColor={Colors.grey20}
                                        onChangeText={setDomicile}
                                        style={{ ...InputText }}
                                    />
                                </View>
                                <TextInput
                                    value={managerJoiningDate}
                                    placeholder='Branch Manager Joining Date'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setManagerJoiningDate}
                                    style={{ ...InputText }}
                                />
                            </LinearGradient>
                        </View>
                        :
                        <></>
                    }
                    <View>
                        <LinearGradient colors={[Colors.lg2, Colors.lg1]}>
                            <Text style={styles.headingText}>Working Hours *</Text>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={opening}
                                    placeholder='Branch Opening Time'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setOpening}
                                    style={{ ...InputText }}
                                />
                                <TextInput
                                    value={closing}
                                    placeholder='Branch Closing Time'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setClosing}
                                    style={{ ...InputText }}
                                />
                            </View>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={breakTime}
                                    placeholder='Branch Break Time Time'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setBreakTime}
                                    style={{ ...InputText }}
                                />
                                <TextInput
                                    value={holiday}
                                    placeholder='Branch Holiday'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setHoliday}
                                    style={{ ...InputText }}
                                />
                            </View>
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={styles.headingText}>Add Gallery Images</Text>
                        <View>
                            <TouchableOpacity onPress={() => GalleryImages()}>
                                <Text style={[styles.addManager, { marginTop: 0 }]}>Upload Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        alignSelf: 'center',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                        borderColor: Colors.orange10,
                        marginTop: '4%'
                    }} onPress={() => {
                        createFranchise()
                        navigation.navigate("Home")
                    }
                    }>
                        <Text style={[styles.addManager, { marginTop: 0, paddingHorizontal: '4%', paddingVertical: '2%' }]}>Create Franchise</Text>
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>

    )
}

export default CreateFranchise

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    ScrollView: {
        paddingBottom: '23%'
    },
    dropDown: {
        height: "85%",
        width: '50%',
        borderRadius: 7,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginLeft: '2%'
    },
    headingText: {
        paddingHorizontal: '2%',
        marginTop: '2%'
    },
    addManager: {
        color: Colors.white,
        ...Typography.normal,
        paddingHorizontal: '2%',
        marginTop: '2%'
    },
    inPutView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageView: {
        height: 70,
        width: 70,
        backgroundColor: Colors.grey30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
})