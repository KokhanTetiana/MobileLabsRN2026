# Лабораторна робота №2

## Побудова вкладеної навігації та оптимізація списків у React Native із використанням компонентів FlatList та SectionList.

---

## 🗒️ Інструкція запуску проєкту
### Клонування репозиторію
```bash
git clone https://github.com/KokhanTetiana/MobileLabsRN2026.git
```
```bash
cd MobileLabsRN2026
```
Перехід у проєкт лабораторної
```bash
cd lab2
```
Встановлення залежностей
```bash
npm install
```
▶️ Запуск проєкту
```bash
npx expo start
```

---

## Функціонал застосунку

### Екран новин (FlatList)

* Відображення списку новин
* Реалізовано **Pull-to-Refresh**
* Реалізовано **Infinite Scroll (підвантаження даних)**
* Додано:

  * ListHeaderComponent
  * ListFooterComponent
  * ItemSeparatorComponent
* Використано параметри оптимізації:

  * initialNumToRender
  * maxToRenderPerBatch
  * windowSize

---

### Навігація

* Реалізовано вкладену навігацію:

  * Drawer Navigator
  * Stack Navigator
* Реалізовано:

  * перехід між екранами
  * передача параметрів
  * динамічний заголовок екрану деталей

---

### Екран деталей

* Відображення повної інформації про новину
* Дані передаються через navigation params

---

### Екран контактів (SectionList)

* Дані згруповані за секціями
* Використано:

  * renderItem
  * renderSectionHeader
  * keyExtractor
  * ItemSeparatorComponent

---

### Drawer Menu

* Кастомне бокове меню
* Містить:

  * аватар
  * ПІБ
  * групу
  * навігацію між екранами

---

## 📸 Скріншоти

Головний екран (список новин)
<img width="680" height="849" alt="image" src="https://github.com/user-attachments/assets/c3ffa90d-356a-40a1-8445-7bf6db204900" />

Головний екран (список новин)
<img width="650" height="860" alt="image" src="https://github.com/user-attachments/assets/cec0f84c-222f-4fa4-8d85-6cb62687762d" />

Екран деталей новини
<img width="512" height="522" alt="image" src="https://github.com/user-attachments/assets/9e8e006c-d4e7-4e88-b428-6b23a448aad0" />

Екран деталей новини
<img width="529" height="512" alt="image" src="https://github.com/user-attachments/assets/7a452717-1c92-4ffe-9647-9e0545513d8a" />

Drawer меню
<img width="530" height="511" alt="image" src="https://github.com/user-attachments/assets/112bdc57-bd34-4eb0-a803-19bcc1cf4f14" />

Екран контактів
<img width="283" height="261" alt="image" src="https://github.com/user-attachments/assets/2d2db393-e852-4888-b903-dfa81e2958e0" />









---

## Висновок

У ході виконання лабораторної роботи №2 було реалізовано вкладену навігацію із використанням Drawer та Stack Navigator. Освоєно принципи роботи компонентів FlatList та SectionList, а також механізм віртуалізації списків, що дозволяє ефективно працювати з великими обсягами даних та оптимізувати продуктивність мобільного застосунку.

---

## ❓ Контрольні запитання

**1. Чим відрізняється FlatList від ScrollView?**
FlatList відображає лише видимі елементи (віртуалізація), тоді як ScrollView рендерить одразу всі елементи.

**2. Що таке віртуалізація списків?**
Це механізм, при якому відображаються тільки ті елементи, які знаходяться в області видимості.

**3. Як здійснюється передача параметрів між екранами?**
Через метод navigation.navigate з передачею об’єкта параметрів.

**4. Що таке вкладена навігація?**
Це структура, в якій один навігатор містить інший (наприклад Drawer + Stack).

**5. У яких випадках застосовується SectionList?**
Коли дані потрібно відобразити у вигляді згрупованих списків (наприклад контакти).

---
