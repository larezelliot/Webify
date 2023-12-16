import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpotifyAPIContext } from '../../App';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';


export function HomeScreen({ navigation }: any) {
    const spotifyAPI = useContext(SpotifyAPIContext);

    const [name, setName] = useState<string | undefined>(undefined);

    const fetchData = async () => {
        try {
            const fetchedName = (await spotifyAPI?.currentUser.profile())?.display_name;

            setName(fetchedName);
        } catch (error) { console.error('Error fetching data:', error); }
    };
    useEffect(() => { fetchData(); }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Text>Hello, {name}</Text>
            <Button
                title="Go to Profile"
                onPress={() => { navigation.navigate('ProfileScreen') }}
            />
            <Button
                title="Go to Favorite Song"
                onPress={() => { navigation.navigate('FavoriteSongScreen') }}
            />
            <Button
                title="Top 10 Songs"
                onPress={() => { navigation.navigate('TopTenSongsScreen') }}
            />
        </View>
    );
}