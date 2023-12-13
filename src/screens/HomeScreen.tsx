import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { getAuthUrl, getCode, getToken } from '../utils/Auth_PKCE';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function HomeScreen({ navigation }: any) {
    //const [authUrlStrign, setAuthUrl] = React.useState("");   //HACK
    const [code, setCode] = React.useState("");
    const [token, setToken] = React.useState("");

    /*
    getAuthUrl().then((value) => { setAuthUrl(value.toString()); })
    getCode().then((value) => { setCode(value) });
    getToken().then((value) => { setToken(value) });*/

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text>Home Screen</Text>

            <Text>CODE: {code?.slice(0, 3)}...</Text>

            <Text>TOKEN: {token?.slice(0, 3)}...</Text>

            <Button
                title="Log In with Spotify"

                onPress={async () => {
                    window.location.href = (await getAuthUrl()).toString()
                }}

            />

            <Button
                title="Refresh Code and Token"

                onPress={async () => {
                    setCode(await getCode());
                    setToken(await getToken());
                }}

            />

            <Button
                title="Go to Profile"
                onPress={() => { navigation.navigate('Profile') }}
            />

            <TextInput placeholder='Something here?' />
        </View >
    );
}