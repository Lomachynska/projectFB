import React, { Component } from 'react'; // Імпортуємо React та клас Component для створення класового компонента

// Імпортуємо іконку "FaTrash" з бібліотеки react-icons/fa
// Це іконка кошика для сміття з набору Font Awesome, яка зазвичай використовується для позначення кнопки видалення.
import { FaTrash } from 'react-icons/fa';


// Компонент Order, який відображає інформацію про товар в кошику
export class Order extends Component {
  render() {
    // Деструктуризація props для зручності: витягуємо дані товару (img, title, desc, price) з this.props.item
    const { img, title, desc, price } = this.props.item;

    return (
      <div className='item'>
        {/* Виведення зображення товару. Шлях до зображення формуємо динамічно */}
        <img src={`/img/${img}.jpg`} alt={title} />

        {/* Назва товару, яка передається через пропс item */}
        <h2>{title}</h2>

        {/* Опис товару */}
        <p>{desc}</p>

        {/* Ціна товару, яка передається через пропс item */}
        <b>{price}$</b>

        {/* Використовуємо іконку "FaTrash" для відображення кошика для сміття */}
        {/* className='delete-icon' додає CSS клас для стилізації іконки, щоб змінити її вигляд (наприклад, розмір або колір).*/}
        <FaTrash className='delete-icon' onClick={() => this.props.onDelete(this.props.item.id) }/> 

      </div>
    );
  }
}

export default Order; // Експортуємо компонент Order для використання в інших частинах програми