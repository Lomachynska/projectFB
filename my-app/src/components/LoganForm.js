import React, { useState } from 'react';

// Створення компонента LoginForm
function LoginForm({ updateUser }) {
  // Оголошуємо стани для логіну, пароля та помилок
  const [login, setLogin] = useState(''); // Стейт для логіна
  const [password, setPassword] = useState(''); // Стейт для пароля
  const [error, setError] = useState(''); // Стейт для помилок

  // Обробник відправки форми
  const handleSubmit = (event) => {
    event.preventDefault(); // Зупиняє перезавантаження сторінки при відправці форми

    // Перевірка на порожній логін
    if (login.trim() === '') {
      setError('Логін не може бути порожнім'); // Встановлюємо помилку для логіна
      return; // Зупиняємо виконання функції
    }

    // Перевірка довжини пароля
    if (password.length < 6) {
      setError('Пароль має бути не менше 6 символів'); // Встановлюємо помилку для пароля
      return; // Зупиняємо виконання функції
    }

    // Логіка після успішного входу
    const userInfo = { login, password }; // Створюємо об'єкт з інформацією користувача

    // Оновлюємо стан користувача в батьківському компоненті
    updateUser(userInfo); // Викликаємо функцію updateUser для оновлення користувача в стані додатку

    // Очищаємо поля форми після успішного логіну
    setLogin('');
    setPassword('');
    setError(''); // Очищаємо помилку
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login">Логін:</label>
        <input
          type="text"
          id="login"
          value={login} // Значення input береться зі стейта
          onChange={(e) => setLogin(e.target.value)} // Оновлюємо стейт при введенні
          required // Вимога для введення логіну
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password} // Значення input береться зі стейта
          onChange={(e) => setPassword(e.target.value)} // Оновлюємо стейт при введенні
          required // Вимога для введення пароля
        />
      </div>
      
      {/* Виведення помилки (якщо є) */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Увійти</button> {/* Кнопка для відправки форми */}
    </form>
  );
}

export default LoginForm; // Експортуємо компонент для використання в інших частинах програми