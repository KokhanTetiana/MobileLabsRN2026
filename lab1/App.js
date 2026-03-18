import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
const news = [
{ id: '1', 
title: 'Літнє наукове стажування для студентів у Литві', text: 'Запрошуємо студентів Державного університету «Житомирська політехніка» взяти участь у літній програмі наукового стажування, що фінансується Радою з досліджень Литви (Research Council of Lithuania, LMT). Програма передбачає виконання індивідуального дослідницького проєкту протягом двох місяців – у липні та серпні – під керівництвом науковців з Університету імені Миколаса Ромеріса (Mykolas Romeris University, Литва).',
image: require('./assets/news1.png') },
{ id: '2', 
title: 'Програма академічних обмінів імені Фулбрайта в Україні', text: 'Програма академічних обмінів імені Фулбрайта в Україні запрошує всіх зацікавлених у четвер, 19 березня, об 11:40 в аудиторії 401 основного корпусу Університету на презентацію фулбрайтівських конкурсів.',
image: require('./assets/news2.png') },
{ id: '3', 
title: 'Студенти університету - Лауреати 1 ступеня на Міжнародному конкурсі мистецтв', text: '21 лютого 2026 року відбувся IV Міжнародний фестиваль – конкурс дитячого, юнацького та молодіжного мистецтва «Стихія мистецтв». Засновником та організатором фестивалю – конкурсу є Громадська організація «Культурно – освітній простір СТАРТ-АРТ».',
image: require('./assets/news3.jpg') },
{ id: '4', 
title: 'Студенти презентували проєкт "Молодіжна лабораторія психоосвіти', text: '05 березня 2026 року в місті Житомирі у межах програми «ДіяТи» відбувся захист молодіжних грантових заявок. Грантова програма спрямована на підтримку ініціативної молоді громади, залучення молодих людей до громадського життя, участі у процесах прийняття рішень, а також розвитку волонтерських і соціальних ініціатив.',
image: require('./assets/news4.jpg')},
{ id: '5', 
title: 'Розвиток Soft skills студентів університету у партнерстві з компанією Epam', text: '3 березня 2026 року студенти 1-го курсу спеціальностей «Комп’ютерна інженерія» та «Кібербезпека та захист інформації» у межах вивчення обовʼязкової навчальної дисципліни «Розвиток комунікаційних навичок та групова динаміка» долучилися до всеукраїнського практичного вебінару «CV джуніора та співбесіда з рекрутером: як пройти перший відбір без паніки та типових помилок?», що було проведено представником багаторічного партнера Житомирської політехніки – компанії EPAM.',
image: require('./assets/news5.png')},
];

return (
<View style={styles.container}>
<Text style={styles.title}>Новини</Text>
<FlatList
data={news}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<View style={styles.card}>
<Image
source={item.image}
style={styles.newsImage}
/>
<Text style={styles.newsTitle}>{item.title}</Text>
<Text>{item.text}</Text>
</View>
)}
/>
</View>
);
}

function GalleryScreen() {
  const images = [
  require('./assets/photo1.jpg'),
  require('./assets/photo2.jpg'),
  require('./assets/photo3.jpg'),
  require('./assets/photo4.jpg'),
  require('./assets/photo5.jpg'),
  require('./assets/photo6.png'),
  require('./assets/photo7.jpg'),
  require('./assets/photo8.jpg'),
];

return (
<ScrollView style={styles.container}>
  <View style={styles.grid}>
    {images.map((img, index) => (
      <Image
        key={index}
        source={img}
        style={styles.galleryImage}
      />
    ))}
  </View>
</ScrollView>
);
}

function RegisterScreen() {
return (
<View style={styles.container}>
<TextInput placeholder="Електронна пошта" style={styles.input} />
<TextInput placeholder="Пароль" style={styles.input} secureTextEntry />
<TextInput placeholder="Пароль (ще раз)" style={styles.input} secureTextEntry />
<TextInput placeholder="Прізвище" style={styles.input} />
<TextInput placeholder="Ім'я" style={styles.input} />
<Button title="Зареєструватися" />
</View>
);
}

export default function App() {
return (
<NavigationContainer>
  <View style={{ flex: 1 }}>
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerTitleAlign: 'left',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        headerRight: () => (
          <Image
            source={require('./assets/logo_university.png')} 
            style={{ width: 100, height: 30, marginRight: 15 }}
          />
        ),
      }}
    >
      <Tab.Screen name="Головна" component={HomeScreen} />
      <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
      <Tab.Screen name="Профіль" component={RegisterScreen} />
    </Tab.Navigator>
    <Text style={styles.footer}>Кохан Тетяна, ІПЗ-22-3</Text>
  </View>
</NavigationContainer>
);
}

const styles = StyleSheet.create({

container: {
flex: 1,
padding: 20,
},

title: {
fontSize: 22,
fontWeight: 'bold',
marginBottom: 10,
},

card: {
backgroundColor: '#DAEAFF',
padding: 15,
marginBottom: 10,
borderRadius: 8,
},

galleryImage: {
  width: '48%',
  height: 120,
  marginBottom: 10,
  borderRadius: 10,
},

newsImage: {
width: '100%',
height: 150,
borderRadius: 8,
marginBottom: 10,
},

newsTitle: {
fontSize:'24',
fontWeight: 'bold',
color:'#022E5B'
},

grid: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-between',
},

input: {
borderWidth: 1,
borderColor: '#ccc',
padding: 10,
marginBottom: 10,
borderRadius: 5,
},

footer: {
  textAlign: 'center',
  padding: 10,
  fontSize: 13,
  color: '#888',
  borderTopWidth: 1,
  borderColor: '#eee',
},
});