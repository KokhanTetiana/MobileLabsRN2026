import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, resetPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = async () => {
    if (!email || !password) {
      const msg = "Заповніть усі поля";
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert("Помилка", msg);
      return;
    }
    try {
      await login(email.trim(), password);
      router.replace('/'); 
    } catch (e) {
      const msg = "Невірний логін або пароль";
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert("Помилка входу", msg);
    }
  };

  const handleReset = async () => {
    if (!email) {
      const msg = "Введіть email у поле вище";
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert("Увага", msg);
      return;
    }
    try {
      await resetPassword(email.trim());
      const msg = "Інструкцію надіслано на пошту (перевірте СПАМ)";
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert("Готово", msg);
    } catch (e) {
      const msg = "Користувача з такою поштою не знайдено";
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert("Помилка", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід</Text>
      <TextInput 
        placeholder="Email" 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Пароль" 
        secureTextEntry 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Увійти" onPress={handleLogin} />
      <Text style={[styles.link, { color: '#007AFF', fontWeight: '500' }]} onPress={handleReset}>
       Забули пароль?
       </Text>      
      <Link href="/register" style={styles.link}>
        <Text style={{color: 'blue'}}>Немає акаунту? Реєстрація</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  link: { marginTop: 15, textAlign: 'center', color: 'gray' }
});