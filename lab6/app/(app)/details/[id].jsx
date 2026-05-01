import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PRODUCTS } from '../../../constants/data';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = PRODUCTS.find(p => p.id === id);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.title }} />

      {product ? (
        <>
          <Image source={{ uri: product.image }} style={styles.image} />

          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price} грн</Text>
          <Text style={styles.desc}>{product.desc}</Text>
        </>
      ) : (
        <Text>Товар не знайдено</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  image: { width: 200, height: 120, borderRadius: 12, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 20, color: 'green', marginVertical: 10 },
  desc: { fontSize: 16, color: '#444' }
});