import React, { Component } from 'react'

export class ShowFullItem extends Component {
  render() {
    const { item, onShowItem, onAdd } = this.props;

    // Перевірка на наявність item
    if (!item) {
      return null; // Якщо немає товару, не рендеримо нічого
    }

    return (
      <div className='full-item'>
        {/* Виведення зображення товару. src формується динамічно через властивість img */}
        <img src={`/img/${item.img}.jpg`} onClick={() => onShowItem(item)} alt={item.title} />

        {/* Назва товару в заголовку h2 */}
        <h2>{item.title}</h2>

        {/* Опис товару в абзаці p */}
        <p>{item.desc}</p>

        {/* Ціна товару, яку виводимо через властивість price */}
        <b>{item.price}$</b>

        {/* Кнопка для додавання товару в кошик. Викликає метод onAdd, передаючи товар */}
        <div className='add-to-cart' onClick={() => onAdd(item)}>+</div>  
      </div>
    )
  }
}

export default ShowFullItem;