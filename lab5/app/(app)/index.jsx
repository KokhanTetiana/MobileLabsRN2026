import { Link } from 'expo-router';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRODUCTS } from '../../constants/data';
import { useAuth } from '../../context/AuthContext';

export default function Catalog() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Магазин</Text>
        <Button title="Вийти" onPress={logout} color="red" />
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>{item.price} грн</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold' },

  card: {
  backgroundColor: '#fff',
  marginBottom: 15,
  borderRadius: 12,
  padding: 10,
  alignItems: 'center',
  elevation: 3
},

  image: {
  width: 200,
  height: 120,
  borderRadius: 10,
  resizeMode: 'cover',
  alignSelf: 'center'
},

  name: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  price: { color: 'green', marginTop: 4 }
});