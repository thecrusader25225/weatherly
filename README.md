# Weatherly

Weatherly is a React-based weather application that provides real-time weather updates and forecasts using various APIs.


## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)


## Description

Weatherly is a weather application that uses multiple APIs to fetch current weather data, 24-hour forecasts, and other related information.


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

This section now focuses specifically on how to run the application and access it locally once it's set up and dependencies are installed.


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


## License


