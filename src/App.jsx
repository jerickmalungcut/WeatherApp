import { useState } from "react";
import axios from "axios";
import { WiCloudy } from "react-icons/wi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoRainyOutline } from "react-icons/io5";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [greeting, setGreeting] = useState(true);

  const apiKey = "c81133daf95ce02be51983b0af9ee5ae";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const handleClick = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      // console.log(response.data);

      //Clear input field
      setLocation("");
    });

    //To remove the greeting
    setGreeting(false);
  };

  //Handle Search Button
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  // To change the Temperature Color
  const getTemperatureColor = () => {
    // Change the color based on the temperature value
    return data.main && data.main.temp > 20
      ? "text-orange-400"
      : "text-blue-400";
  };

  // To change the cloud icons
  const getWeatherIcon = () => {
    // Change the weather icon dynamically
    if (data.weather) {
      const weatherCode = data.weather[0].id;
      if (weatherCode >= 200 && weatherCode < 600) {
        // Rainy weather
        return <IoRainyOutline size={50} />;
      } else if (weatherCode === 800) {
        // Clear/sunny weather
        return <TiWeatherPartlySunny size={60} />;
      } else {
        // Other weather conditions
        return <WiCloudy size={70} />;
      }
    }
    return null;
  };

  return (
    <>
      <main className="main-app relative flex flex-col justify-center items-center h-screen w-full text-white">
        {greeting && (
          <h1 className="text-4xl lg:text-6xl mb-2">
            Hi there! What&apos;s the weather today?
          </h1>
        )}

        {/* Top Description */}
        <div className="top mb-10 min-w-[500px]">
          <div className="flex justify-between items-center mb-6">
            {/* Location */}
            <div className="location text-4xl">
              <p>{data.name}</p>
            </div>

            {/* Description */}
            <div className="description flex">
              <p className="flex items-center text-sm">
                {data.weather ? (
                  <>
                    {data.weather[0].description} {getWeatherIcon()}
                  </>
                ) : null}
              </p>
            </div>
          </div>

          {/* Temperature */}
          <div className="temperature text-9xl text-center">
            <h1 className={getTemperatureColor()}>
              {data.main ? data.main.temp.toFixed() + "°C" : null}
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search border border-white rounded-full py-1 pr-1 pl-4 text-white min-w-[500px] flex justify-between mb-10">
          <input
            type="text"
            className=" bg-transparent w-full outline-none"
            placeholder="Input Location (City or State)"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
          />
          <button
            className="bg-blue-600 hover:bg-blue-500 transition-all py-2 px-4 rounded-full text-white"
            onClick={handleClick}
          >
            Search
          </button>
        </div>

        {/* Bottom Description */}
        {data.name != undefined && (
          <div className="bottom flex justify-between items-center min-w-min w-[400px]">
            <div className="feels">
              <p className="text-3xl">
                {data.main ? data.main.feels_like.toFixed() : null}°C
              </p>
              <p className="text-slate-300 tracking-wider">Feels Like</p>
            </div>
            <div className="humidity">
              <p className="text-3xl">
                {data.main ? data.main.humidity : null}%
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="text-3xl">
                {data.wind ? data.wind.speed.toFixed() : null}mph
              </p>
              <p>Wind</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
