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
    Alert,
    FlatList
} from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Colors, Container, InputText, Typography } from '../components/styles/style-sheet'
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';

const UpdateFranchise = ({ route }) => {
    const { currentItem } = route.params;


    const dispatch = useDispatch();

    const navigation = useNavigation()

    const [id, setId] = useState("");
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
    const [managerName, setManagerName] = useState("");
    const [managerEmail, setManagerEmail] = useState("");
    const [managerImage, setManagerImage] = useState("");
    const [managerAddress, setManagerAddress] = useState("");
    const [managerAwards, setManagerAwards] = useState([]);
    const [rating, setRating] = useState([]);
    const [managerPermanentAddress, setManagerPermanentAddress] = useState("");
    const [dob, setDOB] = useState("");
    const [domicile, setDomicile] = useState("");
    const [managerJoiningDate, setManagerJoiningDate] = useState("");
    const [addLocation, setAddLocation] = useState(false);
    const [addAward, setAddAward] = useState(false);
    const [dateOpen, setDateOpen] = useState(false)
    const [awardType, setAwardType] = useState('');
    const [awardDate, setAwardDate] = useState("");
    const [awardPoints, setAwardPointes] = useState("");
    const [addManagerAward, setAddManagerAward] = useState(false);
    const [managerAwardType, setManagerAwardType] = useState('');
    const [managerAwardDate, setManagerAwardDate] = useState("");
    const [managerAwardPoints, setManagerAwardPointes] = useState("");
    const relative = ["Punjab ", "KPK", "Sindh", "Balochistan", "Gilgit-Baltistan"];
    const refMap = useRef(null);
    const [region, setRegion] = useState();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const window = Dimensions.get('window');
    const { width, height } = window
    const LATITUDE_DELTA = 10;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height)
    const INITIAL_POSITION = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }
    useEffect(() => {
        {
            region === undefined ? (
                setLatitude(currentItem.map_address.latitude),
                setLongitude(currentItem.map_address.longitude)
            )
                : (
                    setLatitude(region.latitude),
                    setLongitude(region.longitude)
                )
        }
    }, [region])


    useEffect(() => {
        setId(currentItem._id)
        setBranchCode(currentItem.code)
        setCategory(currentItem.category)
        setEmployees(currentItem.num_employees)
        setProvince(currentItem.province)
        setOpeningData(currentItem.opening_date)
        setFranchiseImage(currentItem.image)
        setStreet(currentItem.address.street)
        setCity(currentItem.address.city)
        setZip(currentItem.address.zip)
        setCall(currentItem.contact.cell)
        setEmail(currentItem.contact.email)
        setPhone(currentItem.contact.phone)
        setFax(currentItem.contact.fax)
        setManagerName(currentItem.manager.full_name)
        setManagerImage(currentItem.manager.image)
        setManagerEmail(currentItem.manager.email)
        setManagerAddress(currentItem.manager.address)
        setManagerPermanentAddress(currentItem.manager.permanent_address)
        setDOB(currentItem.manager.dob)
        setDomicile(currentItem.manager.domicile)
        setManagerJoiningDate(currentItem.manager.joining_date)
        setOpening(currentItem.working_hours.opening)
        setClosing(currentItem.working_hours.closing)
        setBreakTime(currentItem.working_hours.break_time)
        setHoliday(currentItem.working_hours.holiday)
        setGallery(currentItem.gallery)
        setAwards(currentItem.awards)
        setManagerAwards(currentItem.manager.awards)
        setRating(currentItem.public_ratings)
        setLatitude(currentItem.map_address.latitude)
        setLongitude(currentItem.map_address.longitude)

    }, [currentItem])
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
    const updateFranchise = () => {

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
                _id: id,
                code: branchCode,
                category: category,
                num_employees: employees,
                province: province,
                image: franchiseImage,
                opening_date: openingData,
                address: address,
                public_ratings: rating,
                map_address: mapAddress,
                contact: contact,
                manager: manager,
                awards: awards,
                gallery: gallery,
                working_hours: WorkingHours
            }
            dispatch(franchise(obj, actionTypes.UPDATE_FRANCHISE))
            navigation.navigate("Home")
        }
    }

    const AddLocation = () => {
        setMapAddress({
            latitude: latitude,
            longitude: longitude
        })
        setAddLocation(false)
    }

    const RemoveGalleryImage = (currentImage) => {
        const filtered = gallery.filter((image) => image != currentImage);
        setGallery(filtered)
    }
    const RemoveAward = (currentAward) => {
        const filtered = awards.filter((award) => award.type != currentAward.type && award.date != currentAward.date);
        setAwards(filtered)
    }

    const handleDateChange = (date) => {
        const inputString = moment(date).format('DD/MM/YYY');
        setOpeningData(inputString);
    };

    const RemoveManagerAward = (currentAward) => {
        const filtered = managerAwards.filter((award) => award.type != currentAward.type && award.date != currentAward.date);
        setManagerAwards(filtered)
    }
    const AddAward = () => {
        let award = {
            date: awardDate,
            points: awardPoints,
            type: awardType
        }
        awards.push(award)
        setAwardDate("")
        setAwardPointes("")
        setAwardType("")
    }

    const ManagerAward = () => {
        let mAward = {
            date: managerAwardDate,
            points: managerAwardPoints,
            type: managerAwardType
        }
        managerAwards.push(mAward)

        setManagerAwardDate("")
        setManagerAwardPointes("")
        setManagerAwardType("")
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
                            <Text style={[styles.headingText, { paddingTop: "8%" }]}>Edit Basic info *</Text>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={branchCode}
                                    placeholder='Branch Code'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setBranchCode}
                                    keyboardType="number-pad"
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                                <TextInput
                                    value={category}
                                    placeholder='Branch Category'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setCategory}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />

                            </View>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={employees}
                                    placeholder='Number of Employee'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setEmployees}
                                    style={{ ...InputText, maxWidth: 155 }}
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
                                {dateOpen === false ?
                                    <TouchableOpacity onPress={() => setDateOpen(true)} style={{ ...InputText, maxWidth: 155 }}>
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
                                    : <></>
                                }
                                {dateOpen === true ?
                                    <View>
                                        <CalendarPicker
                                            selectedStartDate={openingData}
                                            onDateChange={handleDateChange}
                                        />
                                        <TouchableOpacity onPress={() => setDateOpen(false)}>
                                            <Text style={styles.addManager}>
                                                Add Date
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <></>
                                }
                                <View>
                                    {!franchiseImage ?
                                        <TouchableOpacity
                                            onPress={() => selectImage()}
                                            style={styles.imageView}>
                                            <Text>Click</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.imageView} onPress={() => selectImage()}>
                                            <Image source={{
                                                uri: franchiseImage
                                            }}
                                                style={{
                                                    height: 70,
                                                    width: 70,
                                                    borderRadius: 100
                                                }} />
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headingIconsView}>
                                <Ionicons name='arrow-back' size={24} onPress={() => navigation.goBack()} />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    <View style={{ backgroundColor: 'red', paddingBottom: 0, marginBottom: 0 }}>
                        <LinearGradient colors={[Colors.lg2, Colors.lg1]}>
                            <Text style={styles.headingText}>Edit Address *</Text>
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
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                                <TextInput
                                    value={zip}
                                    placeholder='Branch Zip Code'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setZip}
                                    style={{ ...InputText, maxWidth: 150 }}
                                    keyboardType="number-pad"
                                />
                            </View>
                            <TouchableOpacity onPress={() => { setAddLocation(true) }}>
                                <Text style={styles.addManager}>Edit Location</Text>
                            </TouchableOpacity>
                            {addLocation ?
                                <View style={{ maxHeight: 300, maxWidth: "100%", }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', margin: "2%" }} onPress={() => AddLocation()}>
                                        <Text style={styles.addManager}>Change Location</Text>
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
                    <View>
                        <LinearGradient colors={[Colors.lg2, Colors.lg1]}>
                            <Text style={styles.headingText}>Edit Manager</Text>
                            <View style={{ flexDirection: 'row', margin: '2%', justifyContent: "space-between", alignItems: 'center' }}>
                                <TextInput
                                    value={managerName}
                                    placeholder='Branch Manager Name'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setManagerName}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                                <View>
                                    {!managerImage ?
                                        <TouchableOpacity
                                            onPress={() => selectManagerImage()}
                                            style={styles.imageView}>
                                            <Text>Click</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.imageView} onPress={() => selectManagerImage()}>
                                            <Image source={{
                                                uri: managerImage
                                            }}
                                                style={{
                                                    height: 70,
                                                    width: 70,
                                                    borderRadius: 100
                                                }} />
                                        </TouchableOpacity>
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
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                                <TextInput
                                    value={domicile}
                                    placeholder='Branch Manager Domicile'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setDomicile}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                            </View>
                            <TextInput
                                value={managerJoiningDate}
                                placeholder='Branch Manager Joining Date'
                                placeholderTextColor={Colors.grey20}
                                onChangeText={setManagerJoiningDate}
                                style={{ ...InputText }}
                            />
                            <Text style={styles.headingText}>Edit Awards</Text>
                            <View style={styles.afterImageContent}>
                                {managerAwards.map((item) => (
                                    item.type === "gold" || item.type === "Gold" ?
                                        <View style={[styles.contactRows, { alignItems: "center" }]}>
                                            <Text style={{ ...Typography.small }}>Gold</Text>
                                            <Text style={{ ...Typography.small }}>{item?.date}</Text>
                                            <View>
                                                <FontAwesome name='trophy' size={24} color={"#FDCC0D"} />
                                                <Text style={{ ...Typography.small }}>{item?.points}</Text>
                                            </View>
                                            <AntDesign name='close' size={18}
                                                onPress={() => RemoveManagerAward(item)}
                                            />
                                        </View>
                                        :
                                        <View style={[styles.contactRows, { alignItems: "center" }]}>
                                            <Text style={{ ...Typography.small }}>Silver</Text>
                                            <Text style={{ ...Typography.small }}>{item?.date}</Text>
                                            <View>
                                                <FontAwesome name='trophy' size={24} color={"#C0C0C0"} />
                                                <Text style={{ ...Typography.small }}>{item?.points}</Text>
                                            </View>
                                            <AntDesign name='close' size={18}
                                                onPress={() => RemoveManagerAward(item)}
                                            />
                                        </View>
                                ))}
                                <TouchableOpacity onPress={() => {
                                    setAddManagerAward(true)
                                }}>
                                    <Text style={[styles.addManager, { marginVertical: '2%' }]}>Add Award</Text>
                                </TouchableOpacity>
                            </View>
                            {addManagerAward ?
                                <>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput
                                            value={managerAwardType}
                                            placeholder='type'
                                            placeholderTextColor={Colors.grey20}
                                            onChangeText={setManagerAwardType}
                                            style={{ ...InputText, minWidth: 110, maxWidth: 110 }}
                                        />
                                        <TextInput
                                            value={managerAwardDate}
                                            placeholder='Date'
                                            placeholderTextColor={Colors.grey20}
                                            onChangeText={setManagerAwardDate}
                                            style={{ ...InputText, minWidth: 110, maxWidth: 110 }}
                                        />
                                        <TextInput
                                            value={managerAwardPoints}
                                            placeholder='Points'
                                            placeholderTextColor={Colors.grey20}
                                            onChangeText={setManagerAwardPointes}
                                            style={{ ...InputText, minWidth: 110, maxWidth: 110 }}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity style={
                                            {
                                                marginVertical: '2%',
                                                justifyContent: 'center',
                                                alignSelf: 'center'
                                            }
                                        }
                                            onPress={() => ManagerAward()}
                                        >
                                            <Text style={{ alignSelf: 'center', color: "#fff" }}>Add Award</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                :
                                <></>
                            }
                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient colors={[Colors.lg2, Colors.lg1]}>
                            <Text style={styles.headingText}>Edit Working Hours *</Text>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={opening}
                                    placeholder='Branch Opening Time'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setOpening}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                                <TextInput
                                    value={closing}
                                    placeholder='Branch Closing Time'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setClosing}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                            </View>
                            <View style={styles.inPutView}>
                                <TextInput
                                    value={breakTime}
                                    placeholder='Branch Break Time Time'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setBreakTime}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                                <TextInput
                                    value={holiday}
                                    placeholder='Branch Holiday'
                                    placeholderTextColor={Colors.grey20}
                                    onChangeText={setHoliday}
                                    style={{ ...InputText, maxWidth: 150 }}
                                />
                            </View>
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={styles.headingText}>Add Gallery Images</Text>
                        <View>
                            <View style={{ marginHorizontal: "2%" }}>
                                <FlatList
                                    horizontal
                                    data={gallery}
                                    renderItem={(item1) => {
                                        return (
                                            <View style={{ paddingHorizontal: '2%' }}>
                                                <Image source={{ uri: item1.item }} style={{ width: 70, height: 70, borderRadius: 7, }} />
                                                <AntDesign name='close' size={18} style={styles.galleryCloseIcon}
                                                    onPress={() => RemoveGalleryImage(item1.item)}
                                                />
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => GalleryImages()}>
                                <Text style={[styles.addManager, { marginVertical: '2%' }]}>Upload Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <LinearGradient colors={[Colors.lg2, Colors.lg1]}>

                            <View style={styles.afterImageContent}>
                                {awards?.map((item) => (
                                    item.type === "gold" || item.type === "Gold" ?
                                        <View style={[styles.contactRows, { alignItems: "center" }]}>
                                            <Text style={{ ...Typography.small }}>Gold</Text>
                                            <Text style={{ ...Typography.small }}>{item?.date}</Text>
                                            <View>
                                                <FontAwesome name='trophy' size={24} color={"#FDCC0D"} />
                                                <Text style={{ ...Typography.small }}>{item?.points}</Text>
                                            </View>
                                            <AntDesign name='close' size={18}
                                                onPress={() => RemoveAward(item)}
                                            />
                                        </View>
                                        :
                                        <View style={[styles.contactRows, { alignItems: "center" }]}>
                                            <Text style={{ ...Typography.small }}>Silver</Text>
                                            <Text style={{ ...Typography.small }}>{item?.date}</Text>
                                            <View>
                                                <FontAwesome name='trophy' size={24} color={"#C0C0C0"} />
                                                <Text style={{ ...Typography.small }}>{item?.points}</Text>
                                            </View>
                                            <AntDesign name='close' size={18}
                                                onPress={() => RemoveAward(item)}
                                            />
                                        </View>
                                ))}
                                <TouchableOpacity onPress={() => {
                                    setAddAward(true)
                                }}>
                                    <Text style={[styles.addManager, { marginVertical: '2%' }]}>Add Award</Text>
                                </TouchableOpacity>
                            </View>
                            {addAward ?
                                <>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput
                                            value={awardType}
                                            placeholder='type'
                                            placeholderTextColor={Colors.grey20}
                                            onChangeText={setAwardType}
                                            style={{ ...InputText, minWidth: 110, maxWidth: 110 }}
                                        />
                                        <TextInput
                                            value={awardDate}
                                            placeholder='Date'
                                            placeholderTextColor={Colors.grey20}
                                            onChangeText={setAwardDate}
                                            style={{ ...InputText, minWidth: 110, maxWidth: 110 }}
                                        />
                                        <TextInput
                                            value={awardPoints}
                                            placeholder='Points'
                                            placeholderTextColor={Colors.grey20}
                                            onChangeText={setAwardPointes}
                                            style={{ ...InputText, minWidth: 110, maxWidth: 110 }}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity style={
                                            {
                                                marginVertical: '2%',
                                                justifyContent: 'center',
                                                alignSelf: 'center'
                                            }
                                        }
                                            onPress={() => AddAward()}
                                        >
                                            <Text style={{ alignSelf: 'center', color: "#fff" }}>Add Award</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                :
                                <></>
                            }

                        </LinearGradient>
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
                        updateFranchise()
                    }}>
                        <Text style={[styles.addManager, { marginTop: 0, paddingHorizontal: '4%', paddingVertical: '2%' }]}>Update Franchise</Text>
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>

    )
}

export default UpdateFranchise

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
        paddingVertical: '2%'
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
    galleryCloseIcon: {
        position: 'absolute',
        right: 1,
        top: 1
    },
    afterImageContent: {
        marginTop: '1%',
        marginHorizontal: '2%',
        justifyContent: 'center',
        marginBottom: '2%',
        borderRadius: 7,
        padding: '2%'

    },
    contactRows: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: '1%'
    },
    headingIconsView: {
        position: 'absolute',
        top: 0,
        left: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%'
    },
})