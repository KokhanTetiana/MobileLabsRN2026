import { Link, useRouter } from 'expo-router';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <TextInput placeholder="Ім'я" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Пароль" secureTextEntry style={styles.input} />
      <TextInput placeholder="Підтвердження паролю" secureTextEntry style={styles.input} />

      <Button
        title="Зареєструватися"
        onPress={() => {
          register();
          router.replace('/');
        }}
      />

      <Link href="/login" style={styles.link}>
        Вже є акаунт? Увійти
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' }
});