import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { getAuthUrl, getCode, getToken } from '../utils/Auth_PKCE';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function TrackScreen({ navigation }: any) {
    const [code, setCode] = React.useState("");
    const [token, setToken] = React.useState("");
    const [request, setRequest] = React.useState("");

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text>Track Screen</Text>

            <Text>CODE: {code?.slice(0, 3)}...</Text>

            <Text>TOKEN: {token?.slice(0, 3)}...</Text>

            <Text>REQUEST: {request} </Text>

            <Button
                title="Refresh Code and Token"

                onPress={async () => {
                    setCode(await getCode());
                    setToken(await getToken());
                }}

            />

            <Button
                title="Make Track Request"
                onPress={() => { setRequest('OK') }}
            />
        </View >
    );
}