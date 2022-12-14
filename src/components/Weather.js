import axios from "axios";
import { useState } from "react";
import useCurrentLocation from "../hooks/useCurrentLocation";
import styled from "styled-components";
import { LoadingDotFlashing } from "./Loading";

const MidTitle = styled.h2`
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 18px;
`;

const WeatherContainer = styled.section`
  width: 100%;
  height: 200px;
  background-color: rgba(236, 236, 236, 0.35);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    position: absolute;
    top: 10px;

    &:hover {
      animation: floating 1.2s ease-in-out infinite;
    }

    @keyframes floating {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }

  div {
    font-size: 20px;
    font-weight: 600;
    &:last-child {
      font-size: 13px;
      padding-bottom: 30px;
    }
  }
`;

const WeatherInfo = styled.div`
  display: grid;
  padding: 20px 20px 20px 0px;
  width: 100%;
  height: auto;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(6, auto);
  font-size: 15px;
  line-height: 160%;
  text-align: center;

  div:first-child {
    grid-area: 1 / 1 / 2 / -1;
    font-weight: bold;
    font-size: 14px;
    height: 30px;
  }

  div:nth-child(odd) {
    font-weight: bold;
  }

  div:nth-child(even) {
    font-size: 12px;
  }
`;

const WeatherAirInfo = styled.div`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "")};
`;

const Weather = () => {
  const [isLoading, setLoading] = useState(true);
  const [icon, setIcon] = useState(null);
  const [weather, setWeather] = useState(null);
  const [description, setDescription] = useState(null);
  const [region, setRegion] = useState(null);
  const [temp, setTemp] = useState(null);
  const [highest, setHighest] = useState(null);
  const [lowest, setLowest] = useState(null);
  const [feelslike, setFeelslike] = useState(null);
  const [pm10, setPM10] = useState(null);
  const [pm2_5, setPM2_5] = useState(null);

  const midtitle = () => {
    const hour = new Date().getHours();
    return hour >= 18
      ? "즐거운 저녁입니다"
      : hour >= 12
      ? "즐거운 오후입니다"
      : hour >= 6
      ? "즐거운 아침입니다"
      : "고요한 새벽입니다";
  };

  useCurrentLocation().then((res) => {
    if (res === undefined) {
      return;
    }

    const { lat, lon } = res;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      )
      .then((res) => {
        setIcon(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@4x.png`);
        setWeather(res.data.weather[0].main);
        setDescription(res.data.weather[0].description);
        setRegion(res.data.name);
        setTemp(res.data.main.temp);
        setHighest(res.data.main.temp_max);
        setLowest(res.data.main.temp_min);
        setFeelslike(res.data.main.feels_like);
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&lang=kr&appid=${process.env.REACT_APP_WEATHER_API}`
          )
          .then((res) => {
            setPM10(res.data.list[0].components.pm10);
            setPM2_5(res.data.list[0].components.pm2_5);
            setLoading(false);
          });
      });
  });

  const colors = [
    "rgba(225, 36, 64, 0.5)",
    "rgba(254, 79, 59, 0.5)",
    "rgba(254, 122, 15, 0.5)",
    "rgba(248, 204, 97, 0.5)",
    "rgba(81, 194, 166, 0.5)",
    "rgba(83, 198, 203, 0.5)",
    "rgba(76, 202, 225, 0.5)",
    "rgba(80, 166, 249, 0.5)",
  ];

  const PM10Color = (PM10) => {
    return PM10 >= 151
      ? colors[0]
      : PM10 >= 101
      ? colors[1]
      : PM10 >= 76
      ? colors[2]
      : PM10 >= 51
      ? colors[3]
      : PM10 >= 41
      ? colors[4]
      : PM10 >= 31
      ? colors[5]
      : PM10 >= 16
      ? colors[6]
      : colors[7];
  };

  const PM2_5Color = (PM2_5) => {
    return PM2_5 >= 76
      ? colors[0]
      : PM2_5 >= 51
      ? colors[1]
      : PM2_5 >= 38
      ? colors[2]
      : PM2_5 >= 26
      ? colors[3]
      : PM2_5 >= 21
      ? colors[4]
      : PM2_5 >= 16
      ? colors[5]
      : PM2_5 >= 9
      ? colors[6]
      : colors[7];
  };

  return (
    <>
      <MidTitle>{midtitle()}</MidTitle>
      <WeatherContainer>
        {!isLoading ? (
          <>
            <WeatherImg>
              <img src={icon} alt="weather icon" />
              <div>{weather}</div>
              <div>{description}</div>
            </WeatherImg>
            <WeatherInfo>
              <div>in {region}</div>
              <div>현재기온</div>
              <div>{temp}℃</div>
              <div>체감온도</div>
              <div>{feelslike}℃</div>
              <div>최고/최저</div>
              <div>
                {highest}/{lowest}℃
              </div>
              <WeatherAirInfo bgColor={PM10Color(pm10)}>PM10</WeatherAirInfo>
              <WeatherAirInfo bgColor={PM10Color(pm10)}>{pm10}</WeatherAirInfo>
              <WeatherAirInfo bgColor={PM2_5Color(pm2_5)}>PM2.5</WeatherAirInfo>
              <WeatherAirInfo bgColor={PM2_5Color(pm2_5)}>{pm2_5}</WeatherAirInfo>
            </WeatherInfo>
          </>
        ) : (
          <LoadingDotFlashing />
        )}
      </WeatherContainer>
    </>
  );
};

export default Weather;
