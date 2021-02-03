// https://developer.spotify.com
// documentation/web-playback-sdk/quick-start///#

export const authEndPoint = "https://accounts.spotify.com/authorize";

const clientId = "5c07abde601c4631a411570fd9492e3a";

const redirectURL = "http://localhost:3000/";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];
// The scope functions alow the user access to certain function on spotify. like permissions.
// read-currently-playing allows access to current playing list.

export const getTokenFromURL = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((intial, item) => {
      // #accessToken=mysupersecretkey&name=sonny
      let parts = item.split("=");
      // decode the part[1(mysupersecretkey) for the part[0] accessToken
      intial[parts[0]] = decodeURIComponent(parts[1]);

      return intial;
    }, {});
};

export const loginURL = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
