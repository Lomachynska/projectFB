import React, { useState } from 'react'; // імпортуємо useState для керування станом компонента
import { FaShoppingCart } from 'react-icons/fa'; // імпортуємо іконку кошика з бібліотеки react-icons
import Order from './Order'; // імпортуємо компонент Order для відображення товарів у кошику
import RegistrationForm from './RegistrationForm'; // імпортуємо компонент реєстрації

// Функція для відображення товарів у кошику
const showOrders = (props) => {
    let suma = 0; // змінна для обчислення суми всіх товарів
    props.orders.forEach(el => suma += Number.parseFloat(el.price)); // підсумовуємо ціни товарів

    return (
        <div>
            {/* Перебираємо масив замовлень та рендеримо компонент Order для кожного товару */}
            {props.orders.map(el => (
                <Order onDelete={props.onDelete} key={el.id} item={el} /> // передаємо товар в компонент Order
            ))}
            {/* Виводимо суму всіх товарів в кошику */}
            <p className='suma'>Сума: {new Intl.NumberFormat().format(suma)}$</p>
        </div>
    );
}

// Функція для відображення повідомлення, коли кошик порожній
const showNothing = () => {
    return (
        <div className='empty'>
            <h2>Товарів немає</h2> {/* Повідомлення про порожній кошик */}
        </div>
    );
}

export default function Header(props) {
    // Використовуємо useState для створення стану cartOpen, який буде визначати, чи відкритий кошик
    const [cartOpen, setCartOpen] = useState(false);
    const [user, setUser] = useState(null);  // Стан для інформації про користувача (null якщо не залогінений)
    const [showRegistration, setShowRegistration] = useState(false); // для показу форми реєстрації

    // Метод для обробки кліку на кошик (відкриває/закриває кошик)
    const toggleCart = () => {
        setCartOpen(prevState => !prevState); // змінюємо стан кошика
    }

    // Метод для відкриття форми реєстрації (або входу) якщо користувач не авторизований
    const handleRegistration = () => {
        setShowRegistration(true); // Показуємо форму реєстрації
    }

    // Метод для виходу з кабінету
    const handleLogout = () => {
        setUser(null); // очищаємо стан користувача
    }

    // Метод для оновлення користувача після реєстрації
    const updateUser = (newUser) => {
        setUser(newUser); // Оновлюємо стан користувача
        setShowRegistration(false); // Закриваємо форму реєстрації
    }

    return (
        <header>
            <div>
                {/* Логотип */}
                <span className='logo'>AVTO shop</span>

                {/* Навігація */}
                <ul className='nav'>
                    <li>Про нас</li>
                    <li>Контакти</li>
                    {/* Якщо користувач не авторизований, показуємо кнопку реєстрації */}
                    {!user && <li><button onClick={handleRegistration}>Зареєструватися</button></li>}
                    {/* Якщо користувач авторизований, показуємо кнопку кабінету та виходу */}
                    {user && (
                        <>
                            <li>Кабінет</li>
                            <li><button onClick={handleLogout}>Вийти</button></li>
                        </>
                    )}
                </ul>

                {/* Іконка кошика, при натисканні на яку відображається або приховується кошик */}
                <FaShoppingCart
                    onClick={toggleCart} // викликаємо метод для відкриття/закриття кошика
                    className={`shop-cart-button ${cartOpen ? 'active' : ''}`} // додаємо клас active, коли кошик відкритий
                />

                {/* Якщо кошик відкритий, відображаємо список товарів у кошику або повідомлення про порожній кошик */}
                {cartOpen && (
                    <div className='shop-cart'>
                        {props.orders.length > 0 ? // перевірка, чи є товари в кошику
                            showOrders(props) : showNothing()} {/* Якщо товарів немає, показуємо повідомлення */}
                    </div>
                )}
            </div>

            {/* Якщо потрібно, показуємо форму реєстрації */}
            {showRegistration && <RegistrationForm onRegister={updateUser} />}
            
            {/* Блок для презентаційного контенту */}
            <div className='presentation'></div>
        </header>
    );
}



// useState:
//За допомогою хука useState створюється стан cartOpen, який відповідає за відображення чи приховування кошика. Значення cartOpen є булевим (true/false), і змінюється функцією setCartOpen.
// Іконка кошика:
// Іконка кошика (FaShoppingCart) має обробник події onClick, який змінює стан cartOpen. Це дозволяє відкрити чи закрити кошик при натисканні на іконку.
// Клас shop-cart-button отримує додатковий клас active, коли кошик відкритий (якщо cartOpen = true), що дозволяє стилізувати іконку в залежності від її стану.
// Відображення товарів у кошику:
// Якщо кошик відкритий і є товари в ньому (props.orders.length > 0), то викликається функція showOrders, яка перебирає масив orders та для кожного товару рендерить компонент Order.
// Якщо кошик порожній, відображається повідомлення через функцію showNothinsg.
// Навігація та логотип:
// Відображаються основні елементи навігації (меню), а також логотип магазину AVTO shop.
// Презентаційний блок:
// Цей блок є порожнім у коді, але можливо використовувати його для додаткового контенту на сторінці, наприклад, для банерів чи іншої інформації.
// Цей компонент відповідає за відображення шапки сайту, включаючи логотип, навігаційне меню та інтерактивний кошик. Якщо є додаткові питання або потрібні зміни, не соромтеся звертатися!