async function fetchGET(endpoint: string, method: string, token: string) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method
    });
    return await res.json();
}

export async function getTop5Tracks(token: string) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchGET('v1/me/top/tracks?time_range=long_term&limit=50 ', 'GET', token)).items;
}