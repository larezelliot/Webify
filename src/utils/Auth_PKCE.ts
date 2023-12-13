import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { getData, storeData } from './StorageService';

const CLIENT_ID = 'e4ed6c256030409b9fd88bef2a3db6e6';
const REDIRECT_URI = makeRedirectUri({ scheme: 'webify', path: 'callback' });

export const getAuthUrl = async () => {
    let code_verifier = await getData('code_verifier') ?? generateRandomString(64);
    storeData('code_verifier', code_verifier);
    storeData('code', undefined);
    storeData('access_token', undefined); //TODO

    const params = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: 'user-read-email playlist-modify-public user-top-read',
        code_challenge_method: 'S256',
        code_challenge: await getCodeChallenge(code_verifier),
        redirect_uri: REDIRECT_URI
    }

    const auth_url = new URL("https://accounts.spotify.com/authorize")
    auth_url.search = new URLSearchParams(params).toString();

    return auth_url;
}   //HACK

export const getCode = async () => {
    let code = await getData('code');
    if (code !== null && code !== undefined) return code;

    const urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get('code') ?? undefined;
    await storeData('code', code);

    return code;
}   //HACK

export const getToken = async () => {
    let access_token = await getData('access_token');
    if (access_token !== null && access_token !== undefined) {
        return access_token;
    }
    const code = await getData('code');
    const code_verifier = await getData('code_verifier');

    const resource = "https://accounts.spotify.com/api/token";
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier,
        })
    };

    const response = await fetch(resource, options);
    const jsonData = await response.json()

    access_token = jsonData.access_token;
    await storeData('access_token', access_token);


    let refresh_token = jsonData.refresh_token;
    await storeData('refresh_token', refresh_token);

    return access_token;
}   //HACK

//#region code_verifier, code_challenge
const generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const base64encode = (input: any) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

const sha256 = async (plain: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

const getCodeChallenge = async (code_verifier: string) => base64encode(await sha256(code_verifier));
//#endregion

