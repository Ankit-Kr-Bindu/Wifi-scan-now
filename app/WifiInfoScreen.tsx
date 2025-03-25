import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NetworkCard } from './components/wifi/NetworkCard';
import { fetchWifiInfo } from './services/wifiService';
import { WifiInfo } from './types/wifi';

export default function WifiInfoScreen() {
  const [wifiInfo, setWifiInfo] = useState<WifiInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchWifiInfo = async () => {
    setLoading(true);
    try {
      const info = await fetchWifiInfo();
      setWifiInfo(info);
    } catch (error) {
      console.error('Error fetching info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchWifiInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WiFi Status</Text>
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={handleFetchWifiInfo}
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
          <NetworkCard wifiInfo={wifiInfo} />
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
