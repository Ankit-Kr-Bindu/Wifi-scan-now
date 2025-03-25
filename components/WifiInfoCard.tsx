import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WifiInfoCardProps {
  wifiInfo: any;
}

const WifiInfoCard: React.FC<WifiInfoCardProps> = ({ wifiInfo }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.infoText}>SSID: {wifiInfo?.ssid}</Text>
      <Text style={styles.infoText}>IP Address: {wifiInfo?.ipAddress}</Text>
      {/* <Text style={styles.infoText}>Is Wifi Connected: {wifiInfo?.isConnected ? 'Yes' : 'No'}</Text> */}
      {/* <Text style={styles.infoText}>Connection Type: {wifiInfo?.connectionType}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default WifiInfoCard;
