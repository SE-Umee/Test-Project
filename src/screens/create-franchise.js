import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Colors, InputText, Typography } from '../components/styles/style-sheet'
import LinearGradient from 'react-native-linear-gradient'
import SelectDropdown from 'react-native-select-dropdown'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux'
import actionTypes from '../redux/action-types'
import { franchise } from '../redux/actions/franchise-action'
import MapView, { Marker } from 'react-native-maps'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Entypo from 'react-native-vector-icons/Entypo';

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
    const provinces = ["Punjab ", "KPK", "Sindh", "Balochistan", "Gilgit-Baltistan", "Islamabad"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const refMap = useRef(null);
    const [region, setRegion] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isOpeningTimePickerVisible, setOpeningTimePickerVisible] = useState(false);
    const [isClosingTimePickerVisible, setClosingTimePickerVisible] = useState(false);
    const [isBreakTimePickerVisible, setBreakTimePickerVisible] = useState(false);
    const [isManagerDOBPickerVisible, setManagerDOBPickerVisible] = useState(false);
    const [isManagerJoiningPickerVisible, setManagerJoiningPickerVisible] = useState(false);
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


    const AddLocation = () => {
        setMapAddress({
            latitude: latitude,
            longitude: longitude
        })

        setAddLocation(false)
    }
    // ====================================images====================================


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

                    return (
                        Alert.alert('Image Added')
                    )
                }
            },
        );

    }
    // ====================================Image====================================
    // ====================================Date And Time Picker======================
    const showDatePicker = (type) => {
        if (type === "opening") {
            setDatePickerVisibility(true);
        }
        else if (type === "dob") {
            setManagerDOBPickerVisible(true)
        }
        else if (type === "joining") {
            setManagerJoiningPickerVisible(true)
        }
    };

    const hideDatePicker = (type) => {
        if (type === "opening") {
            setDatePickerVisibility(false);
        }
        else if (type === "dob") {
            setManagerDOBPickerVisible(false)
        }
        else if (type === "joining") {
            setManagerJoiningPickerVisible(false)
        }
    };

    const handleDateConfirm = (date, type) => {
        const formattedDate = moment(date).format('DD/MM/YYYY');
        if (type === "opening") {
            setOpeningData(formattedDate);
        }
        else if (type === "dob") {
            setDOB(formattedDate)
        }
        else if (type === "joining") {
            setManagerJoiningDate(formattedDate)
        }
        hideDatePicker(type);
    };
    // ====================================Time Picker
    const showTimePicker = (type) => {
        if (type === 'opening') {
            setOpeningTimePickerVisible(true);
        }
        else if (type === 'closing') {
            setClosingTimePickerVisible(true);
        }
        else if (type === 'break') {
            setBreakTimePickerVisible(true);
        }
    };

    const hideTimePicker = (type) => {
        if (type === 'opening') {
            setOpeningTimePickerVisible(false);
        }
        else if (type === 'closing') {
            setClosingTimePickerVisible(false);
        }
        else if (type === 'break') {
            setBreakTimePickerVisible(false);
        }
    };

    const handleTimeConfirm = (time, type) => {
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const twelveHourFormat = hours % 12 || 12;
        const zero = "0";

        if (twelveHourFormat >= 10) {
            if (minutes <= 9) {
                const formattedTime = twelveHourFormat + ':' + zero + minutes + ' ' + ampm;
                if (type === 'opening') {
                    setOpening(formattedTime);
                }
                else if (type === 'closing') {
                    setClosing(formattedTime);

                }
                else if (type === 'break') {
                    setBreakTime(formattedTime);
                }
            } else {
                const formattedTime = twelveHourFormat + ':' + minutes + ' ' + ampm;
                if (type === 'opening') {
                    setOpening(formattedTime);
                }
                else if (type === 'closing') {
                    setClosing(formattedTime);

                }
                else if (type === 'break') {
                    setBreakTime(formattedTime);
                }
            }
        }
        else {
            if (minutes <= 9) {
                const formattedTime = twelveHourFormat + ':' + zero + minutes + ' ' + ampm;
                if (type === 'opening') {
                    setOpening(formattedTime);
                }
                else if (type === 'closing') {
                    setClosing(formattedTime);

                }
                else if (type === 'break') {
                    setBreakTime(formattedTime);
                }
            } else {
                const formattedTime = twelveHourFormat + ':' + minutes + ' ' + ampm;
                if (type === 'opening') {
                    setOpening(formattedTime);
                }
                else if (type === 'closing') {
                    setClosing(formattedTime);

                }
                else if (type === 'break') {
                    setBreakTime(formattedTime);
                }
            }
        }

        hideTimePicker(type);

    };
    // ====================================Date And Time Picker======================


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

        if (branchCode === "") {
            Alert.alert("Branch Code can't be Empty")
        }
        else if (category === "") {
            Alert.alert("category can't be Empty")
        }
        else if (employees === "") {
            Alert.alert("Number of Employ can't be Empty")
        }
        else if (province === "") {
            Alert.alert("Province of the Franchise can't be Empty")
        }
        else if (openingData === "") {
            Alert.alert("Opening Date can't be Empty")
        }
        else if (franchiseImage === "") {
            Alert.alert("Franchise Image can't be Empty")
        }
        else if (street === "") {
            Alert.alert("street Address can't be Empty")
        }
        else if (city === "") {
            Alert.alert("City can't be Empty")
        }
        else if (zip === "") {
            Alert.alert("Zip can't be Empty")
        }
        else if (latitude === "" && longitude === "") {
            Alert.alert("Map Address can't be Empty")
        }
        else if (call === "") {
            Alert.alert("Call number can't be Empty")
        }
        else if (phone === "") {
            Alert.alert("Phone number can't be Empty")
        }
        else if (fax === "") {
            Alert.alert("Fax number can't be Empty")
        }
        else if (email === "") {
            Alert.alert("Email Address can't be Empty")
        }
        else if (opening === "") {
            Alert.alert("Opening Time can't be Empty")
        }
        else if (closing === "") {
            Alert.alert("Closing Time can't be Empty")
        }
        else if (breakTime === "") {
            Alert.alert("Break Time can't be Empty")
        }
        else if (holiday === "") {
            Alert.alert("Holiday can't be Empty")
        }
        else {
            let obj = {
                _id: Math.random(),
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
            navigation.navigate("Home")
        }
    }
    return (

        <View style={styles.mainContainer}>
            <LinearGradient colors={[Colors.lg2, Colors.lg1]} style={styles.mainContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Entypo name='menu' size={24}
                        onPress={() => navigation.openDrawer()}
                        style={{ marginLeft: "2%" }}
                    />
                    <ScrollView
                        contentContainerStyle={styles.ScrollView}
                        showsVerticalScrollIndicator='false'
                    >
                        <View>
                            <Text style={styles.headingText}>Basic info *</Text>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={branchCode}
                                    placeholder='Branch Code'
                                    placeholderTextColor={Colors.grey40}
                                    onChangeText={setBranchCode}
                                    keyboardType="number-pad"
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                                <TextInput
                                    value={category}
                                    placeholder='Branch Category'
                                    placeholderTextColor={Colors.grey40}
                                    onChangeText={setCategory}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                            </View>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={employees}
                                    placeholder='Number of Employee'
                                    placeholderTextColor={Colors.grey40}
                                    onChangeText={setEmployees}
                                    style={{ ...InputText, maxWidth: 150 }}
                                    keyboardType="number-pad"
                                />
                                <SelectDropdown
                                    defaultButtonText={"Select Province"}
                                    data={provinces}
                                    buttonStyle={styles.dropDown}
                                    renderDropdownIcon={() => <AntDesign name='down' size={18} />
                                    }
                                    onSelect={(selectedItem, index) => {
                                        setProvince(selectedItem)
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: '2%', justifyContent: "space-between", alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => showDatePicker("opening")} style={{ ...InputText, maxWidth: 155 }}>
                                    {openingData != "" ?
                                        <Text>
                                            {openingData}
                                        </Text>
                                        :
                                        <Text style={styles.addManager}>
                                            Opening Date
                                        </Text>
                                    }
                                </TouchableOpacity>
                                <View>
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
                        </View>
                        <View>
                            <Text style={styles.headingText}>Address *</Text>
                            <TextInput
                                value={street}
                                placeholder='Branch street Address'
                                placeholderTextColor={Colors.grey40}
                                onChangeText={setStreet}
                                style={{ ...InputText }}
                            />
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={city}
                                    placeholder='Branch City'
                                    placeholderTextColor={Colors.grey40}
                                    onChangeText={setCity}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                                <TextInput
                                    value={zip}
                                    placeholder='Branch Zip Code'
                                    placeholderTextColor={Colors.grey40}
                                    onChangeText={setZip}
                                    style={{ ...InputText, maxWidth: 150 }}
                                    keyboardType="number-pad"
                                />
                            </View>
                            <TouchableOpacity onPress={() => { setAddLocation(true) }}>
                                <Text style={styles.addManager}>Add Location</Text>
                            </TouchableOpacity>
                            {addLocation ?
                                <View style={{ maxHeight: 300, maxWidth: "100%", marginBottom: "20%" }}>
                                    <View style={styles.inPutView}>
                                        <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center" }}>
                                            <Text>Lati:</Text>
                                            <Text style={{ ...InputText, paddingHorizontal: 3 }}>{latitude}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center" }}>
                                            <Text>Long:</Text>
                                            <Text style={{ ...InputText, paddingHorizontal: 3 }}>{longitude}</Text>
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
                        </View>
                        <View>
                            <Text style={styles.headingText}>Contact *</Text>
                            <TextInput
                                value={call}
                                placeholder='Branch Call number'
                                placeholderTextColor={Colors.grey40}
                                onChangeText={setCall}
                                style={{ ...InputText }}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                value={phone}
                                placeholder='Branch Phone number'
                                placeholderTextColor={Colors.grey40}
                                onChangeText={setPhone}
                                style={{ ...InputText }}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                value={fax}
                                placeholder='Branch Fax number'
                                placeholderTextColor={Colors.grey40}
                                onChangeText={setFax}
                                style={{ ...InputText }}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                value={email}
                                placeholder='Branch Email Address'
                                placeholderTextColor={Colors.grey40}
                                onChangeText={setEmail}
                                style={{ ...InputText }}
                                keyboardType="email-address"
                            />
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
                                <View style={{ flexDirection: 'row', margin: '2%', justifyContent: "space-between", alignItems: 'center' }}>
                                    <TextInput
                                        value={managerName}
                                        placeholder='Branch Manager Name'
                                        placeholderTextColor={Colors.grey40}
                                        onChangeText={setManagerName}
                                        style={{ ...InputText, maxWidth: 190 }}
                                    />
                                    <View>
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
                                    placeholderTextColor={Colors.grey40}
                                    onChangeText={setManagerEmail}
                                    style={{ ...InputText }}
                                />
                                <TextInput
                                    value={managerAddress}
                                    placeholder='Branch Manager Current Address'
                                    placeholderTextColor={Colors.grey40}
                                    onChangeText={setManagerAddress}
                                    style={{ ...InputText }}
                                />
                                <TextInput
                                    value={managerPermanentAddress}
                                    placeholder='Branch Manager Permanent Address'
                                    placeholderTextColor={Colors.grey40}
                                    onChangeText={setManagerPermanentAddress}
                                    style={{ ...InputText }}
                                />
                                <View style={styles.inPutView}>

                                    <TouchableOpacity onPress={() => showDatePicker("dob")} style={{ ...InputText, maxWidth: 155 }}>
                                        {dob != "" ?
                                            <Text>
                                                {dob}
                                            </Text>
                                            :
                                            <Text style={styles.addManager}>
                                                Manager DOB
                                            </Text>
                                        }
                                    </TouchableOpacity>
                                    <TextInput
                                        value={domicile}
                                        placeholder='Branch Manager Domicile'
                                        placeholderTextColor={Colors.grey40}
                                        onChangeText={setDomicile}
                                        style={{ ...InputText, maxWidth: 190 }}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => showDatePicker("joining")} style={{ ...InputText }}>
                                    {managerJoiningDate != "" ?
                                        <Text>
                                            {managerJoiningDate}
                                        </Text>
                                        :
                                        <Text style={styles.addManager}>
                                            Manager Joining Date
                                        </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            :
                            <></>
                        }
                        <View>
                            <Text style={styles.headingText}>Working Hours *</Text>
                            <View style={styles.inPutView}>
                                <TouchableOpacity onPress={() => showTimePicker('opening')} style={{ ...InputText, maxWidth: 155 }}>
                                    {opening != "" ?
                                        <Text>
                                            {opening}
                                        </Text>
                                        :
                                        <Text style={styles.addManager}>
                                            Opening Time
                                        </Text>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showTimePicker('closing')} style={{ ...InputText, maxWidth: 155 }}>
                                    {closing != "" ?
                                        <Text>
                                            {closing}
                                        </Text>
                                        :
                                        <Text style={styles.addManager}>
                                            Closing Time
                                        </Text>
                                    }
                                </TouchableOpacity>

                            </View>
                            <View style={styles.inPutView}>
                                <TouchableOpacity onPress={() => showTimePicker('break')} style={{ ...InputText, maxWidth: 155 }}>
                                    {breakTime != "" ?
                                        <Text>
                                            {breakTime}
                                        </Text>
                                        :
                                        <Text style={styles.addManager}>
                                            Break Time
                                        </Text>
                                    }
                                </TouchableOpacity>
                                {/* <TextInput
                                value={holiday}
                                placeholder='Branch Holiday'
                                placeholderTextColor={Colors.grey40}
                                onChangeText={setHoliday}
                                style={{ ...InputText, maxWidth: 150 }}
                            /> */}
                                <SelectDropdown
                                    defaultButtonText={"Holiday"}
                                    data={days}
                                    buttonStyle={styles.holyDayDropDown}
                                    renderDropdownIcon={() => <AntDesign name='down' size={18} />
                                    }
                                    onSelect={(selectedItem, index) => {
                                        setHoliday(selectedItem)
                                    }}
                                />
                            </View>
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
                        }
                        }>
                            <Text style={[styles.addManager, { marginTop: 0, paddingHorizontal: '4%', paddingVertical: '2%' }]}>Create Franchise</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => handleDateConfirm(date, "opening")}
                        onCancel={() => hideDatePicker("opening")}
                    />
                    <DateTimePickerModal
                        isVisible={isManagerDOBPickerVisible}
                        mode="date"
                        onConfirm={(data) => handleDateConfirm(data, 'dob')}
                        onCancel={() => hideDatePicker("dob")}
                    />
                    <DateTimePickerModal
                        isVisible={isManagerJoiningPickerVisible}
                        mode="date"
                        onConfirm={(data) => handleDateConfirm(data, 'joining')}
                        onCancel={() => hideDatePicker("joining")}
                    />
                    <DateTimePickerModal
                        isVisible={isOpeningTimePickerVisible}
                        mode="time"
                        onConfirm={(time) => handleTimeConfirm(time, 'opening')}
                        onCancel={() => hideTimePicker('opening')}
                    />

                    <DateTimePickerModal
                        isVisible={isClosingTimePickerVisible}
                        mode="time"
                        onConfirm={(time) => handleTimeConfirm(time, 'closing')}
                        onCancel={() => hideTimePicker('closing')}
                    />

                    <DateTimePickerModal
                        isVisible={isBreakTimePickerVisible}
                        mode="time"
                        onConfirm={(time) => handleTimeConfirm(time, 'break')}
                        onCancel={() => hideTimePicker('break')}
                    />
                </SafeAreaView>
            </LinearGradient>
        </View>

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
        marginLeft: '2%',

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
    holyDayDropDown: {
        ...InputText,
        maxWidth: 150,
        height: "80%",
        backgroundColor: 'transparent',
    },
})