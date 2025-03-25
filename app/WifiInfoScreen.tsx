import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Network from 'expo-network';
import NetInfo from '@react-native-community/netinfo';
import WifiStrengthGauge from '../components/WifiStrengthGauge';

interface WifiDetails {
  strength?: number;
  ssid?: string;
}

interface WifiInfo {
  isConnected: boolean;
  type: string;
  isInternetReachable: boolean | null;
  strength?: number;
  ssid?: string;
  ipAddress?: string;
}

export default function WifiInfoScreen() {
  const [wifiInfo, setWifiInfo] = useState<WifiInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchWifiInfo = async () => {
    setLoading(true);
    try {
      const [networkState, netInfo, ipAddress] = await Promise.all([
        Network.getNetworkStateAsync(),
        NetInfo.fetch(),
        Network.getIpAddressAsync()
      ]);

      const details = netInfo.details as WifiDetails;
      setWifiInfo({
        isConnected: networkState.isConnected ?? false,
        type: networkState.type ?? 'unknown',
        isInternetReachable: networkState.isInternetReachable ?? null,
        strength: details?.strength,
        ssid: details?.ssid ?? 'Unknown',
        ipAddress: ipAddress
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWifiInfo();
    const interval = setInterval(fetchWifiInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WiFi Status</Text>
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={fetchWifiInfo}
          disabled={loading}
        >
          <MaterialCommunityIcons 
            name="refresh" 
            size={24} 
            color={loading ? '#999' : '#007AFF'} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Scanning network...</Text>
          </View>
        ) : wifiInfo ? (
          <>
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
              </View>
            </View>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons name="wifi-alert" size={48} color="#F44336" />
            <Text style={styles.errorText}>Unable to get network information</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
  valueColor?: string;
}

const InfoItem = ({ icon, label, value, valueColor = '#000' }: InfoItemProps) => (
  <View style={styles.infoItem}>
    <MaterialCommunityIcons name={icon as any} size={24} color="#666" />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, { color: valueColor }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  refreshButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
