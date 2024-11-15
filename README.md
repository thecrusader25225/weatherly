# Weatherly

Weatherly is a React-based weather application that provides real-time weather updates and forecasts using various APIs.


## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Future Enhancements](#future-enhancements)
- [License](#license)


## Description

### Current Weather Display
- Displays current weather conditions including temperature, pressure, humidity, wind speed, wind direction, AQI, UV and weather description.
- Provides dynamic backgrounds that change based on weather conditions (e.g., sunny, rainy, cloudy), as well as time of day (e.g., day and night).
- Uses openweathermap.org APIs for Current Weather forecast
- Uses geocoding API 

### Hourly and Daily Forecasts
- Shows detailed hourly forecasts with temperature, weather icons, and wind speed.
- Offers daily forecasts for upcoming days, allowing users to plan ahead.

### Location-Based Weather
- Uses geolocation API to fetch weather data based on the user's current location.
- Allows users to search for weather information in different locations by entering a city name or zip code.

### Interactive Map Integration
- Includes a map feature using the Leaflet library, enabling users to click on locations to fetch weather data.
- Displays markers and pop-ups with weather details for selected locations.

### Additional Weather Data
- Integrates with qweather.com API for detailed weather information, including UV index and air quality data.
- Provides icons from qWeather Icons for various weather conditions to enhance visual representation.
- Provides AQI data from api.openuv.io

### User Customization
- Supports dark mode and light mode toggles for personalized viewing preferences.
- Ensures uniform styling across pages to maintain consistency in user experience.

### News Integration
- Fetches and displays news articles related to weather using the worldnewsapi.com API, keeping users informed about weather-related news.


## Installation

To install the project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/thecrusader25225/weatherly.git
   ```
2. **Navigate to the project directory:**

    ```sh
    cd weatherly
    ```

3. **Install the dependencies:**

    ```sh
    npm install
    ```

4. **Install Tailwind CSS:**

    ```sh
    npm install -D tailwindcss
    ```

5. **Install React Icons:**

    ```sh
    npm install react-icons
    ```

6. **Install qWeather Icons:**
  ```sh
    npm i qweather-icons
  ```


## Configuration

 **Create a `.env` File**:
   Create a file named `.env` at the root of your project and add the following environment variables. Replace the placeholder values with your actual API keys:

   ```plaintext
   REACT_APP_API_KEY=your_qweather_api_key
   REACT_APP_NEWS_API_KEY=your_newsdata_api_key
   REACT_APP_QWEATHER_API_KEY=your_qweather_api_key
   REACT_APP_UV_API_KEY=your_uv_api_key
   ```


## Usage

### Running the App

1. **Start the development server:**

    ```sh
    npm start
    ```

2. **Open your browser and navigate to:**

    ```
    http://localhost:3000
    ```

### Alternatively,

**Users can access Weatherly by visiting [Vercel Deployment Link](https://weatherly-theta.vercel.app/).**
    

## Features

- Real-time weather updates for any location 
- 24-hour weather forecast
- 5-day weather forecast
- Current location of user's real-time weather forecast 
- Dark mode and light mode
- Weather updates provided for any location pointed out in integrated map
- News updates related to weather
- Detailed AQI for a location


## Contributing

To contribute to this project, follow these steps:

1. **Fork the repository.**

2. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes and commit them:**

    ```bash
    git commit -m 'Add some feature'
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Create a pull request.**


## Future Enhancements

- Planned features include adding more interactive elements, improving data visualization, and enhancing accessibility features to cater to a broader audience.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for exploring Weatherly! We hope you find it useful and enjoyable. If you have any questions, feedback, or would like to contribute, please don't hesitate to reach out at [thecrusader.25225@gmail.com](mailto:thecrusader.25225@gmail.com). Happy coding!

---

