import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../store';
import { toggleFavourite } from '../store/gamesSlice';
import { GameDetails } from '../types';

const GameDetailsScreen = ({ route }: { route: any }) => {
    const { gameId } = route.params;
    const [game, setGame] = useState<GameDetails | null>(null);
    const favourites = useSelector((state: RootState) => state.games.favourites);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get<GameDetails>(`https://mock-game-api-9a408f047f23.herokuapp.com/api/games/${gameId}`, {
                    headers: { 'X-API-Key': '01964fa8-f0e5-40fc-a13b-9f5c3a5415f3' },
                });
                setGame(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGameDetails();
    }, [gameId]);

    if (!game) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <>
        <Image
          source={{uri: game.bannerURL}}
          style={{width: '100%', height: 200}}
        />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -40
            }}>
          <Image
            source={{uri: game.iconURL}}
            style={{width: 80, height: 80, borderRadius:10}}
          />
        </View>
        <ScrollView style={{padding: 10, marginTop:10}}>
          <Text>{game.description}</Text>
          <Text>Rating: {game.rating}/5</Text>
          <Button
            title={favourites.includes(game.id) ? 'Unfavourite' : 'Favourite'}
            onPress={() => dispatch(toggleFavourite(game.id))}
          />
        </ScrollView>
      </>
    );
};

export default GameDetailsScreen;