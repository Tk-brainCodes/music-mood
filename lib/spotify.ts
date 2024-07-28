import axios from "axios";

export interface Playlist {
  name: string;
  description: string;
  owner: {
    display_name: string;
  };
  uri: string;
}

export const getSpotifyAccessToken = async (): Promise<string> => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      params: {
        grant_type: "client_credentials",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    }
  );
  return response.data.access_token;
};

export const getPlaylistByMood = async (
  mood: string,
  genre: string
): Promise<Playlist> => {
  const accessToken = await getSpotifyAccessToken();

  const query = `${mood} ${genre}`;

  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    params: {
      q: query,
      type: "playlist",
      limit: 1,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const playlist = response.data.playlists.items[0];
  return {
    name: playlist.name,
    description: playlist.description,
    owner: {
      display_name: playlist.owner.display_name,
    },
    uri: playlist.uri,
  };
};
