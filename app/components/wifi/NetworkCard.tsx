import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WifiStrengthGauge from './../../components/WifiStrengthGauge';
import { InfoItem } from './InfoItem';

interface LocationInfo {
  latitude: number;
  longitude: number;
}

interface WifiInfo {
  isConnected: boolean;
  type: string;
  isInternetReachable: boolean | null;
  strength?: number;
  ssid?: string;
  ipAddress?: string;
  location?: LocationInfo;
}

interface NetworkCardProps {
  wifiInfo: WifiInfo;
}

export const NetworkCard = ({ wifiInfo }: NetworkCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.networkHeader}>
        <MaterialCommunityIcons 
          name={wifiInfo.isConnected ? "wifi" : "wifi-off"} 
          size={32} 
          color={wifiInfo.isConnected ? "#4CAF50" : "#F44336"} 
        />
        <Text style={styles.ssid}>{wifiInfo.ssid || 'Unknown Network'}</Text>
      </View>
      
      <WifiStrengthGauge strength={wifiInfo.strength} />

      <View style={styles.infoGrid}>
        <InfoItem 
          icon="wifi-strength-4" 
          label="Type" 
          value={wifiInfo.type} 
        />
        <InfoItem 
          icon="signal" 
          label="Signal Strength" 
          value={`${wifiInfo.strength || 0} dBm`} 
        />
        <InfoItem 
          icon="connection" 
          label="Status" 
          value={wifiInfo.isConnected ? 'Connected' : 'Disconnected'} 
          valueColor={wifiInfo.isConnected ? '#4CAF50' : '#F44336'}
        />
        <InfoItem 
          icon="web" 
          label="Internet" 
          value={wifiInfo.isInternetReachable ? 'Available' : 'Unavailable'} 
          valueColor={wifiInfo.isInternetReachable ? '#4CAF50' : '#F44336'}
        />
        <InfoItem 
          icon="ip-network" 
          label="IP Address" 
          value={wifiInfo.ipAddress || 'Unknown'} 
        />
        {wifiInfo.location && (
          <>
            <InfoItem 
              icon="map-marker" 
              label="Latitude" 
              value={wifiInfo.location.latitude.toFixed(6)} 
            />
            <InfoItem 
              icon="map-marker" 
              label="Longitude" 
              value={wifiInfo.location.longitude.toFixed(6)} 
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  networkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ssid: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 12,
    color: '#000',
  },
  infoGrid: {
    marginTop: 16,
  },
}); 