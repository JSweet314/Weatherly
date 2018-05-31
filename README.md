# Weatherly
By Mike Duke and Jonathan Sweet

Built with React and utilizing the Weather Underground API, this app lets a user search for weather data by location and receive the current, 7-hour, and 10-day forecasts.

## Usage
* Get an api key from [weather underground](https://www.wunderground.com/weather/api/)
* Clone down this repo and change in to the directory
  * `git clone https://github.com/JSweet314/Weatherly.git && cd Weatherly`
* Create a directory called `private/` with a file `apiKey.js`
* Within apiKey.js, type `export const apiKey = "YOUR API KEY"`
* Run `npm install`
* Run `npm start` and visit localhost:8080 in your preferred browser.
* To run the test suite - `npm test`
* To run the linter - `npm run eslint`

Welcome Screen
![Finished Welcome Screen](/lib/images/finishedwelcome.png)

Search Results
![Finished Main Page](/lib/images/finishedMain.png)
