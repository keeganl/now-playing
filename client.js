const SpotifyWebApi = require("spotify-web-api-node");


var spotifyApi = new SpotifyWebApi({
  clientId: "9fee713c870f404a96e06e18ef64b4b8",
  clientSecret: "dcb99cbde2624b8bb22e572740d438ac",
  redirectUri: "http://www.example.com/callback"
});

// Passing a callback - get Elvis' albums in range [20...29]
spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    // Passing a callback - get Elvis' albums in range [20...29]
    spotifyApi
      .getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 })
      .then(
        function (data) {
          data.body.items.forEach(name => {
            console.log(name.name);

          });
        },
        function (err) {
          console.error(err);
        }
      );
  }, function (err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });
