import React, { Component } from 'react'; // Імпортуємо React та клас Component для створення класових компонентів
import Item from './Item'; // Імпортуємо компонент Item для використання в цьому компоненті

// Класовий компонент Items, який відповідає за відображення списку товарів
export class Items extends Component {
  render() {
    return (
      <main>
        {/* Перебираємо масив товарів, що передається через пропс items */}
        {this.props.items.map(el => (
            // Для кожного товару створюємо компонент Item
            // Передаємо йому унікальний ключ key, властивість item (дані товару) та метод onAdd для додавання товару в кошик
            <Item onShowItem={this.props.onShowItem} key={el.id} item={el} onAdd={this.props.onAdd} />
        ))}
      </main>
    );
  }
}

export default Items; // Експортуємо компонент Items для використання в інших частинах програми