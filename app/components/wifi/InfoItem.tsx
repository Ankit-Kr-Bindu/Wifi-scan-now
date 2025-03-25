import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
  valueColor?: string;
}

export const InfoItem = ({ icon, label, value, valueColor = '#000' }: InfoItemProps) => (
  <View style={styles.infoItem}>
    <MaterialCommunityIcons name={icon as any} size={24} color="#666" />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, { color: valueColor }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 