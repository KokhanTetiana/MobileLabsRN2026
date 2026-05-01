import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>
          Сторінку не знайдено
        </Text>

        <Link href="/" style={{ marginTop: 15, color: 'blue' }}>
          На головну
        </Link>
      </View>
    </>
  );
}