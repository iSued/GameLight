// src/screens/GamesScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setGames, toggleFavourite } from '../store/gamesSlice';
import axios from 'axios';
import { RootState } from '../store';
import { Game } from '../types';

const GamesScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.games.games);
  const favourites = useSelector((state: RootState) => state.games.favourites);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get<Game[]>('https://mock-game-api-9a408f047f23.herokuapp.com/api/games', {
          headers: { 'X-API-Key': '01964fa8-f0e5-40fc-a13b-9f5c3a5415f3' },
        });
        dispatch(setGames(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, [dispatch]);

    const renderItem = ({ item }: { item: Game }) => (
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
            }}
        >
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Image source={{ uri: item.iconURL }} style={{ width: 50, height: 50, borderRadius:10}} />
                <View
                    style={{
                        flex: 1,
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
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
                onPress={() => navigation.navigate('GameDetails', { gameId: item.id })}
            >
                <Text style={{ color: 'white' }}>Details</Text>
            </TouchableOpacity>
        </View>
    );
  return (
    <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
    />
  );
};

export default GamesScreen;
