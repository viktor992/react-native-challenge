/* eslint-disable camelcase */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, CardItem, Text, Left, Body, Thumbnail } from 'native-base';
import WeatherField from './WeatherField';

const styles = StyleSheet.create({
  container: { margin: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardTextContainer: { margin: 5 },
});

interface WeatherDataProps {
  data: Array<{
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
  }>;
}

const WeatherData: React.FC<WeatherDataProps> = ({ data }) => {
  return (
    <ScrollView>
      {data?.length > 0 ? (
        data.map((x) => (
          <View key={x.id} style={styles.container}>
            <Card style={{ flex: 0 }}>
              <CardItem header bordered>
                <Left>
                  <Thumbnail
                    source={{
                      uri: `https://www.metaweather.com/static/img/weather/png/64/${x.weather_state_abbr}.png`,
                    }}
                  />
                  <Body>
                    <Text style={styles.cardTitle}>
                      Date: {x.applicable_date}
                    </Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <View style={styles.cardTextContainer}>
                    <WeatherField data={x.weather_state_name} round={false} />
                    <WeatherField
                      title="Wind direction:"
                      data={x.wind_direction_compass}
                      round={false}
                    />
                    <WeatherField
                      title="Min temp:"
                      data={x.min_temp}
                      round
                      unit="°C"
                    />
                    <WeatherField
                      title="Max temp:"
                      data={x.max_temp}
                      round
                      unit="°C"
                    />
                  </View>
                  <View
                    style={{
                      margin: 5,
                    }}
                  >
                    <WeatherField
                      title="Wind speed:"
                      data={x.wind_speed}
                      round
                      unit="mph"
                    />
                    <WeatherField
                      title="Air pressure:"
                      data={x.air_pressure}
                      round
                      unit="mbar"
                    />
                    <WeatherField
                      title="Humidity:"
                      data={x.humidity}
                      round
                      unit="%"
                    />
                    <WeatherField
                      title="Visibility:"
                      data={x.visibility}
                      round
                      unit="miles"
                    />
                  </View>
                </Body>
              </CardItem>
            </Card>
          </View>
        ))
      ) : (
        <Text>No data</Text>
      )}
    </ScrollView>
  );
};

export default WeatherData;
