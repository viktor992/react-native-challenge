/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ParameterInfo from '../components/ParameterInfo';
import WeatherData from '../components/WeatherData';

interface ForecastData {
  id: number;
  applicable_date: string;
  weather_state_abbr: string;
  weather_state_name: string;
  wind_direction_compass: string;
  min_temp: number;
  max_temp: number;
  wind_speed: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});

const HomeScreen: React.FC<void> = ({ navigation }) => {
  const [location, setLocation] = useState<null | {
    woeid: number;
    title: string;
  }>(null);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [forecast, setForecast] = useState<Array<ForecastData>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getForecast = async (
      woeid: number,
      formattedDate: string,
      isToday: boolean
    ) => {
      if (woeid && formattedDate) {
        if (isToday) {
          const response = await axios.get(
            `https://www.metaweather.com/api/location/${woeid}`
          );
          setForecast(response?.data?.consolidated_weather);
        } else {
          const response = await axios.get(
            `https://www.metaweather.com/api/location/${woeid}/${formattedDate}/`
          );
          setForecast([response?.data[0]]);
        }
        setLoading(false);
      }
    };

    if (selectedDate && location) {
      setLoading(true);
      setForecast([]);
      const current = new Date();
      getForecast(
        location?.woeid,
        `${selectedDate.getFullYear()}/${
          selectedDate.getMonth() + 1
        }/${selectedDate.getDate()}`,
        current.getFullYear() === selectedDate.getFullYear() &&
          current.getMonth() === selectedDate.getMonth() &&
          current.getDate() === selectedDate.getDate()
      );
    }
  }, [selectedDate, location]);

  return (
    <Container style={styles.maiContainer}>
      <StatusBar barStyle="dark-content" />
      <Content>
        <ParameterInfo
          iconName="earth"
          placeholder="Please select a location"
          inputPressed={() =>
            navigation.navigate('Location', { onSelect: setLocation })
          }
          value={location?.title}
        />
        <ParameterInfo
          iconName="calendar"
          placeholder="Please select a date"
          inputPressed={() => setDatePickerVisible(true)}
          value={`${selectedDate.getFullYear()}/${
            selectedDate.getMonth() + 1
          }/${selectedDate.getDate()}`}
        />
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          isDarkModeEnabled={false}
          onConfirm={(date) => {
            setSelectedDate(date);
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />
        {loading ? (
          <Spinner color="#68C2F3" />
        ) : (
          selectedDate && location && <WeatherData data={forecast} />
        )}
      </Content>
    </Container>
  );
};

export default HomeScreen;
