import { Link, useRouter } from 'expo-router';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRODUCTS } from '../../constants/data';
import { useAuth } from '../../context/AuthContext';

export default function Catalog() {
  const { logout } = useAuth();
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Магазин</Text>
        
        <View style={styles.buttonGroup}>
          {/* Кнопка переходу в профіль */}
          <TouchableOpacity 
            style={styles.profileBtn} 
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.profileBtnText}>Профіль</Text>
          </TouchableOpacity>

          <Button title="Вийти" onPress={logout} color="#FF3B30" />
        </View>
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardInfo}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>{item.price} грн</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, paddingTop: 50, backgroundColor: '#F5F7FA' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20 
  },
  buttonGroup: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1C1E' },
  
  profileBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    marginRight: 10,
  },
  profileBtnText: { color: '#fff', fontWeight: '600' },

  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  cardInfo: {
    padding: 10,
    alignItems: 'flex-start',
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#1A1C1E' },
  price: { color: '#34C759', fontWeight: '700', fontSize: 16, marginTop: 4 }
});