# Compare actors

🍿 Select two movies and see if there are any actors which appear in both!

## How this app was built

⚛ App is built using Create React App and fetches data from the IMDB API. Styling is done using Sass with the BEM methodology.

## Limitations

🚫 The IMDB API used for this App does not have the ability to resize images, so the app is slow to load images of movie posters.

🚫 The IMDB API does not allow multiple search queries in one end point so information about each actor is limited to the names of characters in each movie and a link to tehir IMDB page. Orinigally the app looped through each actor to retrieve all info for each actor but this made the app slow and very quickly used up the API quota.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
