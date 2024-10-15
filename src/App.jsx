import { useEffect, useState } from "react";

import clearSky from "./assets/images/01d.png";
import fewClouds from "./assets/images/02d.png";
import scatteredClouds from "./assets/images/03d.png";
import brokenClouds from "./assets/images/04d.png";
import showerRain from "./assets/images/09d.png";
import rain from "./assets/images/10d.png";
import thunderstorm from "./assets/images/11d.png";
import snow from "./assets/images/13d.png";
import mist from "./assets/images/50d.png";
import nightClearSky from "./assets/images/01n.png";
import nightFewClouds from "./assets/images/02n.png";
import nightScatteredClouds from "./assets/images/03n.png";
import nightBrokenClouds from "./assets/images/04n.png";
import nightShowerRain from "./assets/images/09n.png";
import nightRain from "./assets/images/10n.png";
import nightThunderstorm from "./assets/images/11n.png";
import nightSnow from "./assets/images/13n.png";
import nightMist from "./assets/images/50n.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  code,
  weather,
  humidity,
  pressure,
  wind,
}) => {
  return (
    <>
      <div className="glass p-8 mb-10 text-center text-[#fbfcfc]">
        <h2 className="text-3xl font-semibold">{city}</h2>
        <p className="text-gray-400">{code}</p>
        <div className="flex flex-col md:flex-row items-center justify-center mt-6 space-x-6">
          <img src={icon} alt="weather-icon" className="w-40 h-40" />
          <div className="ml-4">
            <p className="text-6xl font-bold">{temp}°C</p>
            <p className="text-gray-400">{weather}</p>
          </div>
        </div>
        <div className="mt-8 flex  gap-5 flex-wrap justify-around text-lg">
          <div className="text-center">
            <p className="font-semibold">Humidity</p>
            <p className="text-gray-400">{humidity}%</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Wind</p>
            <p className="text-gray-400">{wind} km/h</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Pressure</p>
            <p className="text-gray-400">{pressure} hPa</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const App = () => {
  const api_key = "804eaf82d35bdd25b0a81ce36d2e519d";

  const [text, setText] = useState("chennai");
  const [icon, setIcon] = useState();
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [pressure, setPressure] = useState("");

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);

  const weatherIconMap = {
    "01d": clearSky,
    "02d": fewClouds,
    "03d": scatteredClouds,
    "04d": brokenClouds,
    "09d": showerRain,
    "10d": rain,
    "11d": thunderstorm,
    "13d": snow,
    "50d": mist,
    "01n": nightClearSky,
    "02n": nightFewClouds,
    "03n": nightScatteredClouds,
    "04n": nightBrokenClouds,
    "09n": nightShowerRain,
    "10n": nightRain,
    "11n": nightThunderstorm,
    "13n": nightSnow,
    "50n": nightMist,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod === "404") {
        
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setCity(data.name);
      setCode(data.sys.country);
      setTemp(Math.floor(data.main.temp));
      setWeather(data.weather[0].main);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setPressure(data.main.pressure);
      setIcon(weatherIconMap[data.weather[0].icon]);
      setCityNotFound(false);
      setError(null)
    } catch (error) {
      console.error("error occured:", error.message);
      setError("Error Occured While fetching data.")
      setCityNotFound(true)
    } finally {
      setLoading(false);
    }
  };

  useEffect(function () {
    search();
  }, []);

  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  return (
    <>
      <div className="relative max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#fbfcfc] mb-4 tracking-widest">
            Weather App
          </h1>
          <input
            type="text"
            placeholder="Search city..."
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
            required
            className="px-4 py-3 w-full rounded-lg text-[#040608] bg-[#fbfcfc] focus:outline-none focus:ring-2 focus:ring-[#f39c12] transition duration-300"
          />
        </div>


          {/* alert */}

        { cityNotFound &&
          <div
          role="alert"
          className="mb-4 flex flex-col w-full justify-center text-center p-3 text-sm text-white bg-red-600 rounded-md"
        >
          <svg
            className="w-20 h-20 text-white mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          City Not Found
        </div>}


          {/* error alert */}

          { error &&
          <div
          role="alert"
          className="mb-4 flex flex-col w-full justify-center text-center p-3 text-sm text-white bg-red-600 rounded-md"
        >
         {error}
        </div>}

      { !loading && !cityNotFound && <WeatherDetails
          icon={icon}
          city={city}
          code={code}
          temp={temp}
          weather={weather}
          humidity={humidity}
          wind={wind}
          pressure={pressure}
        />}
        {loading && (
          <div
            role="status"
            className="absolute backdrop-blur-sm w-full h-full -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex justify-center items-center"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
};
