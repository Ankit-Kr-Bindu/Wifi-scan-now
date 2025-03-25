import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface WifiStrengthGaugeProps {
  strength?: number;
}

export default function WifiStrengthGauge({ strength }: WifiStrengthGaugeProps) {
  if (!strength) return null;
  
  const widthAnim = useRef(new Animated.Value(0)).current;

  const getStrengthPercentage = (dbm: number) => {
    const min = -100;
    const max = -40;
    const percentage = Math.min(100, Math.max(0, ((dbm - min) / (max - min)) * 100));
    return Math.round(percentage);
  };

  const percentage = getStrengthPercentage(strength);
  
  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [percentage]);

  const getQualityInfo = () => {
    if (strength >= -50) return { label: 'Excellent', color: '#4CAF50', icon: 'wifi-strength-4' };
    if (strength >= -60) return { label: 'Good', color: '#8BC34A', icon: 'wifi-strength-3' };
    if (strength >= -70) return { label: 'Fair', color: '#FFC107', icon: 'wifi-strength-2' };
    return { label: 'Poor', color: '#F44336', icon: 'wifi-strength-1' };
  };

  const qualityInfo = getQualityInfo();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name={qualityInfo.icon as any} size={24} color={qualityInfo.color} />
        <Text style={[styles.qualityText, { color: qualityInfo.color }]}>
          {qualityInfo.label}
        </Text>
        <Text style={styles.dbmText}>{strength} dBm</Text>
      </View>

      <View style={styles.gaugeContainer}>
        <View style={styles.gaugeBackground}>
          <Animated.View 
            style={[
              styles.gaugeFill,
              { 
                width: widthAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                }),
                backgroundColor: qualityInfo.color,
              }
            ]} 
          />
        </View>
        <View style={styles.tickMarks}>
          <Text style={styles.tickLabel}>-100</Text>
          <Text style={styles.tickLabel}>-70</Text>
          <Text style={styles.tickLabel}>-40</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  qualityText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  dbmText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  gaugeContainer: {
    width: '100%',
  },
  gaugeBackground: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  gaugeFill: {
    height: '100%',
    borderRadius: 6,
  },
  tickMarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  tickLabel: {
    fontSize: 12,
    color: '#666',
  },
}); 