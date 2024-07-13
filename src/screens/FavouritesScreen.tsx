// src/screens/FavouritesScreen.tsx

import React from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleFavourite } from '../store/gamesSlice';
import { Game } from '../types';

const FavouritesScreen = ({ navigation }: { navigation: any }) => {
  const games = useSelector((state: RootState) => state.games.games);
  const favourites = useSelector((state: RootState) => state.games.favourites);
  const dispatch = useDispatch();

  const favouriteGames = games.filter(game => favourites.includes(game.id));

const renderItem = ({item}: {item: Game}) => (
  <View
    style={{
      marginVertical: 7.5,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}>
    <View style={{flexDirection: 'row', padding: 10}}>
      <Image
        source={{uri: item.iconURL}}
        style={{width: 50, height: 50, borderRadius: 10}}
      />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{item.title}</Text>
        <Text>Rating: {item.rating}/5</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(toggleFavourite(item.id))}>
        <Text>
          {favourites.includes(item.id) ? 'Unfavourite' : 'Favourite'}
        </Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      style={{
        backgroundColor: '#f194ff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
      }}
      onPress={() => navigation.navigate('GameDetails', {gameId: item.id})}>
      <Text style={{color: 'white'}}>Details</Text>
    </TouchableOpacity>
  </View>
);

  return (
    <FlatList
      data={favouriteGames}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{padding: 10}}
    />
  );
};

export default FavouritesScreen;
