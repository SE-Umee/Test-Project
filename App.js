import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import StateScreen from './src/screens/state-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "./src/components/styles/style-sheet";
import { franchiseScreen, DrawerNav } from "./src/navigation/navigation"
import { Provider } from 'react-redux'
import store from './src/redux/store/store';



const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          tabBarActiveTintColor: Colors.orange10,
          tabBarInactiveTintColor: Colors.green10,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.grey40,
            height: 69
          },
          tabBarShowLabel: false
        }} >
          <Tab.Screen
            options={{
              tabBarLabel: 'Franchise',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="building-o" color={color} size={26} />
              ),
            }}
            name='Franchise' component={franchiseScreen} />
          <Tab.Screen
            options={{
              tabBarLabel: 'State',
              tabBarIcon: ({ color }) => (
                <Ionicons name="stats-chart" color={color} size={26} />
              ),
            }}
            name='State' component={StateScreen} />
          <Tab.Screen
            options={{
              tabBarLabel: 'Admin',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="admin-panel-settings" color={color} size={26} />
              ),
            }}
            name='Admin' component={DrawerNav} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})