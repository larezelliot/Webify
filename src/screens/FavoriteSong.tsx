import React, { useEffect, useState, useContext } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { SpotifyAPIContext } from '../../App';
import { AudioFeatures, Track } from '@spotify/web-api-ts-sdk';
import RadarChart from 'react-svg-radar-chart';

export function FavoriteSongScreen({ navigation }: any) {
    const spotifyAPI = useContext(SpotifyAPIContext);

    const [song, setSong] = useState<Track | undefined>(undefined);
    const [audioFeatures, setAudioFeatures] = useState<AudioFeatures | undefined>(undefined);


    const fetchData = async () => {
        try {
            const fetchedSong = (await spotifyAPI?.currentUser.topItems("tracks", "short_term", 1, 0))?.items[0];
            if (fetchedSong === undefined) throw Error('No fetched song');

            const fetchedAudioFeatures = (await spotifyAPI?.tracks.audioFeatures(fetchedSong?.id));

            setSong(fetchedSong);
            setAudioFeatures(fetchedAudioFeatures);
        } catch (error) { console.error('Error fetching data:', error); }
    };
    useEffect(() => { fetchData(); }, []);

    const data = [
        {
            data: {
                accousticness: audioFeatures?.acousticness ?? 0,
                danceability: audioFeatures?.danceability ?? 0,
                energy: audioFeatures?.energy ?? 0,
                instrumentalness: audioFeatures?.instrumentalness ?? 0,
                liveness: audioFeatures?.liveness ?? 0,
                speechiness: audioFeatures?.speechiness ?? 0,
                valence: audioFeatures?.valence ?? 0,
            },
            meta: { color: 'blue' }
        }
    ];

    const captions = {
        accousticness: "Acousticness",
        danceability: "Danceability",
        energy: "Energy",
        instrumentalness: "Instrumentalness",
        liveness: "Liveness",
        speechiness: "Speechiness",
        valence: "Valence",
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Favorite Song</Text>
            <Text>{song?.name}</Text>
            <Text>Album: {song?.album.name}</Text>
            <Text>Artist: {song?.artists[0].name}</Text>
            <Text>{song?.explicit ?? "Explicit"} </Text>
            <Text>* Acousticness: {audioFeatures?.acousticness} </Text>
            <Text>* Danceability: {audioFeatures?.danceability} </Text>
            <Text>* Energy: {audioFeatures?.energy} </Text>
            <Text>* Instrumentalness: {audioFeatures?.instrumentalness} </Text>
            <Text>* Liveness: {audioFeatures?.liveness} </Text>
            <Text>* Speechiness: {audioFeatures?.speechiness} </Text>
            <Text>* Valence: {audioFeatures?.valence} </Text>

            <RadarChart
                captions={captions}
                data={data}
                size={450}
            />
        </View>
    );
}