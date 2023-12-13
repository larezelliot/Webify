import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen'
import { ProfileScreen } from './src/screens/ProfileScreen';
import { createContext, useState } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export const SpotifyAPIContext = createContext<SpotifyApi | undefined>(undefined);
const Stack = createNativeStackNavigator();

export default function App() {
  const [spotifyAPI, setSpotifyAPI] = useState(
    SpotifyApi.withUserAuthorization(
      "e4ed6c256030409b9fd88bef2a3db6e6",
      "https://localhost:19006/callback",
      [
        "user-read-email",
        "playlist-modify-public",
        "user-top-read",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-follow-read",
        "user-follow-modify"
      ])
  );
  spotifyAPI.authenticate();

  return (
    <SpotifyAPIContext.Provider value={spotifyAPI}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SpotifyAPIContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
