export interface LocationInfo {
  latitude: number;
  longitude: number;
}

export interface WifiInfo {
  isConnected: boolean;
  type: string;
  isInternetReachable: boolean | null;
  strength?: number;
  ssid?: string;
  ipAddress?: string;
  location?: LocationInfo;
}

export interface WifiDetails {
  strength?: number;
  ssid?: string;
  isWifiEnabled?: boolean;
} 