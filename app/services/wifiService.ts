import { Platform, PermissionsAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Network from 'expo-network';
import * as Location from 'expo-location';
import { WifiInfo, WifiDetails } from '../types/wifi';

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const [locationGranted, wifiGranted] = await Promise.all([
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs access to location to get WiFi information",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        ),
        Location.requestForegroundPermissionsAsync()
      ]);
      return locationGranted === PermissionsAndroid.RESULTS.GRANTED && wifiGranted.status === 'granted';
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export const getWifiInfo = async (): Promise<WifiDetails> => {
  try {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      return { ssid: 'Permission Denied', strength: 0 };
    }

    const netInfo = await NetInfo.fetch();
    const details = netInfo.details as any;
    
    const ssid = details?.ssid || 'Unknown';
    const strength = -(100 - (details?.strength || 0));

    console.log('Network details:', details);
    console.log('SSID:', ssid);
    console.log('Strength:', strength);

    return { ssid, strength };
  } catch (error) {
    console.log('Error getting WiFi info:', error);
    return { ssid: 'Unknown', strength: 0 };
  }
};

export const getLocation = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
  } catch (error) {
    console.log('Error getting location:', error);
    return undefined;
  }
};

export const fetchWifiInfo = async (): Promise<WifiInfo> => {
  const [netInfo, ipAddress, wifiDetails, location] = await Promise.all([
    NetInfo.fetch(),
    Network.getIpAddressAsync(),
    getWifiInfo(),
    getLocation()
  ]);

  console.log('Full NetInfo:', netInfo);

  return {
    isConnected: netInfo.isConnected ?? false,
    type: netInfo.type ?? 'unknown',
    isInternetReachable: netInfo.isInternetReachable ?? null,
    strength: wifiDetails.strength,
    ssid: wifiDetails.ssid,
    ipAddress: ipAddress,
    location: location
  };
}; 