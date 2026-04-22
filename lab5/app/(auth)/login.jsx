import { Link, useRouter } from 'expo-router';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід</Text>

      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Пароль" secureTextEntry style={styles.input} />

      <Button
        title="Увійти"
        onPress={() => {
          login();
          router.replace('/');
        }}
      />

      <Link href="/register" style={styles.link}>
        Немає акаунту? Зареєструватися
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