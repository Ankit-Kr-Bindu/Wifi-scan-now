import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'WiFi Info',
          headerShown: true 
        }} 
      />
    </Stack>
  );
} 