import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import GamesScreen from '../screens/GamesScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const GamesStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GamesList" component={GamesScreen}/>
            <Stack.Screen name="GameDetails" component={GameDetailsScreen}   />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Games" component={GamesStackNavigator} options={{ headerShown: false }} />
                <Tab.Screen name="Favourites" component={FavouritesScreen}  />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;