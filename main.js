const { app, BrowserWindow } = require("electron");
const menubar = require('menubar')
const SpotifyWebApi = require("spotify-web-api-node");


var mb = menubar()
mb.setOption('width', 1000)
mb.setOption('height', 600)
mb.setOption('icon', './assets/icon.png')

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

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

mb.on('ready', function ready() {
  function createWindow() {
    // Create the browser window.
    // win = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    win.loadFile('index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
})

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
