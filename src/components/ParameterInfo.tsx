import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text } from 'native-base';

interface ParameterInfoProps {
  inputPressed: () => void;
  value?: string;
  placeholder: string;
  iconName: string;
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  leftIcon: { marginRight: 12 },
  text: { flexGrow: 1 },
  rightIcon: { fontSize: 24 },
  underline: { width: '100%', height: 1, backgroundColor: '#E8E8E8' },
});

const ParameterInfo: React.FC<ParameterInfoProps> = ({
  inputPressed,
  value,
  placeholder,
  iconName,
}) => {
  return (
    <TouchableOpacity onPress={inputPressed}>
      <View style={styles.mainContainer}>
        <Icon name={iconName} type="AntDesign" style={styles.leftIcon} />
        <Text style={styles.text}>{value || placeholder}</Text>
        <Icon name="right" type="AntDesign" style={styles.rightIcon} />
      </View>
      <View style={styles.underline} />
    </TouchableOpacity>
  );
};

export default ParameterInfo;
