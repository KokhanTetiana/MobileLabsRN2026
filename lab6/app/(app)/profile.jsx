import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebaseConfig';

export default function Profile() {
  const { user, logout, updateProfile, deleteAccount } = useAuth();
  const [profile, setProfile] = useState({ name: '', age: '', city: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (user?.uid) {
        try {
          const snap = await getDoc(doc(db, "users", user.uid));
          if (snap.exists()) setProfile(snap.data());
        } catch (e) {
          console.error("Помилка завантаження:", e);
        } finally {
          setLoading(false);
        }
      }
    };
    load();
  }, [user]);

  const showAlert = (title, msg) => {
    Platform.OS === 'web' ? window.alert(`${title}: ${msg}`) : Alert.alert(title, msg);
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(profile);
      showAlert("Успіх", "Дані оновлено!");
    } catch (e) {
      showAlert("Помилка", e.message);
    }
  };

  const handleDelete = async () => {
    let password = "";
    if (Platform.OS === 'web') {
      password = window.prompt("Для підтвердження видалення введіть ваш пароль:");
    } else {
      showAlert("Увага", "На мобільних пристроях потрібне кастомне вікно введення пароля. Скористайтеся веб-версією.");
      return;
    }

    if (!password) return;

    try {
      await deleteAccount(password);
      showAlert("Видалено", "Ваш акаунт успішно видалено.");
    } catch (e) {
      console.error(e);
      showAlert("Помилка", "Не вдалося видалити: можливо, невірний пароль.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{marginTop: 10}}>Завантаження профілю...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Мій Профіль</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ваше ім'я</Text>
          <TextInput 
            style={styles.input} 
            value={profile.name} 
            onChangeText={t => setProfile({...profile, name: t})} 
            placeholder="Введіть ім'я" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Вік</Text>
          <TextInput 
            style={styles.input} 
            value={String(profile.age || '')} 
            onChangeText={t => setProfile({...profile, age: t})} 
            placeholder="Скільки вам років?" 
            keyboardType="numeric" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Місто</Text>
          <TextInput 
            style={styles.input} 
            value={profile.city} 
            onChangeText={t => setProfile({...profile, city: t})} 
            placeholder="Ваше місто" 
          />
        </View>

        <TouchableOpacity style={[styles.button, {backgroundColor: '#34C759'}]} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Зберегти зміни</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {backgroundColor: '#FF9500', marginTop: 10}]} onPress={logout}>
          <Text style={styles.buttonText}>Вийти з акаунта</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteLink} onPress={handleDelete}>
          <Text style={styles.deleteLinkText}>Видалити акаунт назавжди</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA', justifyContent: 'center' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 20, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 5, color: '#1A1C1E', textAlign: 'center' },
  emailText: { textAlign: 'center', color: 'gray', marginBottom: 25, fontSize: 14 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#444' },
  input: { backgroundColor: '#F0F2F5', padding: 12, borderRadius: 10, fontSize: 16 },
  button: { padding: 15, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  deleteLink: { marginTop: 25, alignItems: 'center' },
  deleteLinkText: { color: '#FF3B30', fontWeight: '600', textDecorationLine: 'underline' }
});