import { createStackNavigator } from "@react-navigation/stack"
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

const adminScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Admin' component={AdminScreen} />
            <Stack.Screen name='CreateFranchise' component={CreateFranchise} />
            <Stack.Screen name="News" component={AddNews} />
            <Stack.Screen name="EditNews" component={EditNews} />
        </Stack.Navigator>
    )
}
export { adminScreen }
