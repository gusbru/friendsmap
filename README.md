# Friend Map

Web Application to add friends and find places to go out and hang out.
User can create groups of friends and the application will help them to
find some site to meet. The suggested places are inside a range of distance
that each friend is willing to walk.

- **Database Collections**
  - Friends: name, lat, lng
  - Groups: Name, [Friends]
  - Places: name, lat, lng

## Instalation

Before run the project it is necessary to install the packages.
Run:

`npm run install`

## Running

Before run the application locally it is necessary to configure
the credentials to connect to MongoDB atlas and Google
Maps API. Create a `.env` file and add at least the two
keys: `DB_CONNECTION` and `API_KEY` with the credentials to connect
to MongoDB and Google Maps API, respectivelly.

After the instalation of the packages is done, and the .env file adjusted, just run:

`npm start`

The `start` command will automatically run `webpack` and `node`.

By default the application will listening for connection on port 3001. You
can use the `.env` file to specify a different port by assigning a value to the PORT key,
as for example:

`PORT='5002'`

### Development

For development purposes, a `.env` file must be created. In addition to the port it is
necessary to specify the string to connect to MongoDB Atlas server and the key for the
Google Maps API authentication.

```
DB_CONNECTION='mongodb_atlas_string'

API_KEY='google_maps_key'
```

Also, it is necessary to change the Maps component to use the development API_KEY.
This is done by modifying the beginning of the file `src/Components/MapsDummy.js`
to:

```
// development
const GOOGLE_MAP_API_KEY = process.env.API_KEY;

// production
// const GOOGLE_MAP_API_KEY = "AIzaSyDVXfEyzX9q65V0tDd_yxozu6zt9VRcygo";
```

## API Routes

The documentation for the API can be found
<a href="https://documenter.getpostman.com/view/3652511/SW7gU5C4?version=latest" target="_blank">here</a>

## Citations

### Icons

- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

### Third-party API

- [Google Maps API](https://developers.google.com/maps/documentation)

## Live example (Heroku)

[Demo](https://cpsc2600-gbrunetto00.herokuapp.com)
