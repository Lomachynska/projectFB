import React, { Component } from 'react'; // Імпортуємо React та компонент Component для створення класових компонентів

// Створення класового компонента Item, який відповідає за відображення товару
export class Item extends Component {
  render() {
    return (
      <div className="item">
        {/* Виведення зображення товару. src формується динамічно через властивість img */}
        <img src={`/img/${this.props.item.img}.jpg`} onClick={() => this.props.onShowItem(this.props.item)} alt={this.props.item.title} />

        {/* Назва товару в заголовку h2 */}
        <h2>{this.props.item.title}</h2>

        {/* Опис товару в абзаці p */}
        <p>{this.props.item.desc}</p>

        {/* Ціна товару, яку виводимо через властивість price */}
        <b>{this.props.item.price}$</b>

        {/* Кнопка для додавання товару в корзину. Викликає метод onAdd, передаючи товар */}
        <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>
          +
        </div>
      </div>
    );
  }
}

export default Item; // Експортуємо компонент Item, щоб його можна було використовувати в інших частинах програми