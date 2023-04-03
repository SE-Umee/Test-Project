import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import DetailsScreen from "../screens/details-screen";
import HomeScreen from "../screens/home-screen";
import MapScreen from "../screens/map-screen";
import ImageModal from "../components/image-modal";
import AdminScreen from "../screens/admin-screen";
import CreateFranchise from "../screens/create-franchise";
import AddNews from "../screens/add-news";
import UpdateFranchise from "../screens/update-franchise";
import EditNews from "../screens/edit-news";


const Stack = createStackNavigator();
const franchiseScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailsScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="ImageModal" component={ImageModal} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Edit" component={UpdateFranchise} />
        </Stack.Navigator>
    )
}

export { franchiseScreen }


const NewsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="News" component={AddNews} />
            <Stack.Screen name="EditNews" component={EditNews} />
        </Stack.Navigator>
    )
}

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Admin' component={AdminScreen} />
            <Drawer.Screen name='CreateFranchise' component={CreateFranchise} />
            <Drawer.Screen name="News Stack" component={NewsStack} />
        </Drawer.Navigator>
    )
};
export { DrawerNav }




