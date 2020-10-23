import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';

const styles = StyleSheet.create({
  title: { fontSize: 13 },
  value: { fontSize: 13, fontWeight: '600' },
});
interface WeatherFieldProps {
  data: number | string;
  unit?: string;
  title?: string;
  round: boolean;
}

const WeatherField: React.FC<WeatherFieldProps> = ({
  data,
  unit = '',
  title = '',
  round = true,
}) => {
  return (
    <View>
      <Text style={styles.title}>
        <Text style={styles.value}>{title}</Text>
        {`${round ? parseFloat(`${data}`).toFixed(0) : data} ${unit}`}
      </Text>
    </View>
  );
};

WeatherField.defaultProps = {
  data: 0,
};

export default WeatherField;
