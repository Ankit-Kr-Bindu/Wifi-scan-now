import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

interface WifiStrengthGaugeProps {
  strength?: number;
}

const getStrengthPercentage = (dbm: number = 0) => {
  // Convert dBm to percentage (0 dBm = 100%, -100 dBm = 0%)
  const percentage = Math.min(100, Math.max(0, (100 + dbm)));
  return percentage;
};

const getStrengthColor = (percentage: number) => {
  if (percentage >= 80) return '#4CAF50';
  if (percentage >= 60) return '#8BC34A';
  if (percentage >= 40) return '#FFC107';
  if (percentage >= 20) return '#FF9800';
  return '#F44336';
};

export default function WifiStrengthGauge({ strength = 0 }: WifiStrengthGaugeProps) {
  const percentage = getStrengthPercentage(strength);
  const color = getStrengthColor(percentage);
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Percentage text */}
        <SvgText
          x={size / 2}
          y={size / 2}
          fontSize="48"
          fontWeight="bold"
          fill={color}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {`${Math.round(percentage)}%`}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
}); 