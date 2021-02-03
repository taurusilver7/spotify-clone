import React, { useEffect } from "react";
import "./App.css";

import Login from "./components/Login/Login";
import Player from "./components/Player/Player";
import { getTokenFromURL } from "./spotify";

import { useDataLayerValue } from "./context/DataLayerProvider";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();
// create an instance for spotify in our clone to allow communication b/w app & clone.

const App = () => {
  const [{ token }, dispatch] = useDataLayerValue();

  //run code based on the dependency
  useEffect(() => {
    // set token
    const hash = getTokenFromURL();
    window.location.hash = "";
    // for security reasons, clean up after the token is displayed.
    const _token = hash.access_token;

    if (_token) {
      // giving the access token to spotify api to allow communication.
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      // get the logged user details from the api
      spotify.getMe().then((user) => {
        // set the user details into the data layer.
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlist) => {
        dispatch({
          type: "SET_PLAYLIST",
          playlists: playlist,
        });
      });

      spotify.getPlaylist("5HuIURkrPNn56mwlfZWvtj").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );
    }
  }, [token, dispatch]);

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
};

export default App;
