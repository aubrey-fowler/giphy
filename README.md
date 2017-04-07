## Description

ReactJS Web Application with Redux.

The application calls the [Giphy REST API](http://api.giphy.com/) to request for photo data. When the user clicks on a photo, a dialog appears with the selected Giphy's video playing.

There are several thousand entries returned for each search result that contain a complex JSON object. 

A pagination approach was taken. The first 3 pages are pre-loaded. If the user clicks on another page, the data only for that page is loaded.

Rational:

Pagination divides large data sets into smaller subsets that are manageable for the user to read. Significant performance can be achieved by only returning subsets of a large data set. Pagination gives the user an idea of how big the data set is, how much is left to read, and how much they have already seen.

## Available Scripts

### To run the app in production mode please install pushstate-server.

In the project directory, you can run:<br>

npm install -g pushstate-server<br>
### `pushstate-server build`
start [http://localhost:9000](http://localhost:9000)<br>

Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.<br>
The build is minified and the filenames include the hashes.<br>

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
