import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '', age: '', city: '' });

  const handleRegister = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Помилка", "Будь ласка, введіть Email та Пароль (мін. 6 символів)");
      return;
    }

    try {
      console.log("Спроба реєстрації для:", form.email);
      
      await register(form.email.trim(), form.password, { 
        name: form.name, 
        age: form.age, 
        city: form.city 
      });

      console.log("Реєстрація успішна!");
      router.replace('/'); 
      
    } catch (e) {
      console.error("Firebase Error Code:", e.code);
      console.error("Firebase Error Message:", e.message);
      Alert.alert("Помилка реєстрації", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      <TextInput placeholder="Ім'я" style={styles.input} onChangeText={t => setForm({...form, name: t})} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={t => setForm({...form, email: t})} />
      <TextInput placeholder="Пароль" secureTextEntry style={styles.input} onChangeText={t => setForm({...form, password: t})} />
      <TextInput placeholder="Вік" style={styles.input} keyboardType="numeric" onChangeText={t => setForm({...form, age: t})} />
      <TextInput placeholder="Місто" style={styles.input} onChangeText={t => setForm({...form, city: t})} />
      <Button title="Створити акаунт" onPress={handleRegister} />
      <Link href="/login" style={styles.link}>Вже є акаунт? Увійти</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  link: { marginTop: 15, textAlign: 'center', color: 'blue' }
});