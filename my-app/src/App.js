import React from "react";
import Header from "./components/Header";  // Імпортуємо компонент Header для відображення заголовка та кошика
import Footer from "./components/Footer";  // Імпортуємо компонент Footer для відображення підвалу сторінки
import Items from "./components/Items";  // Імпортуємо компонент Items для відображення товарів
import Categories from "./components/Categories";  // Імпортуємо компонент Categories для відображення категорій товарів
import ShowFullItem from "./components/ShowFullItem";  // Імпортуємо компонент ShowFullItem для відображення детальної інформації про товар
import RegistrationForm from "./components/RegistrationForm"; // Імпортуємо компонент реєстрації

// Основний клас App, який є головним компонентом додатку
class App extends React.Component {
  constructor(props) {
    super(props);
    // Ініціалізація стану компонента
    this.state = {
      orders: [],  // Список товарів, що додані в кошик
      currentItems: [  // Список всіх доступних товарів
        {
          id: 1,
          title: 'Брелок Audi',
          img: 'Audi',
          desc: 'Стильний шкіряний Брелок з логотипом',
          category: 'Audi',
          price: '199.00'
        },
        {
          id: 2,
          title: 'Брелок Fiat',
          img: 'Fiat',
          desc: 'Стильний шкіряний Брелок з логотипом',
          category: 'Fiat',
          price: '199.00'
        },
        {
          id: 3,
          title: 'Брелок Mitsubishi',
          img: 'Mitsubishi',
          desc: 'Стильний шкіряний Брелок з логотипом',
          category: 'Mitsubishi',
          price: '199.00'
        },
        {
          id: 4,
          title: 'Брелок Toyota',
          img: 'Toyota',
          desc: 'Стильний шкіряний Брелок з логотипом',
          category: 'Toyota',
          price: '199.00'
        },
        {
          id: 5,
          title: 'Брелок VW',
          img: 'VW',
          desc: 'Стильний шкіряний Брелок з логотипом',
          category: 'VW',
          price: '199.00'
        },
      ],
      showFullItem: false,  // Показувати деталі товару
      fullItem: {},  // Товар для детального перегляду
      user: null,  // Інформація про користувача (null якщо не залогінений)
      showRegistration: false, // Стан для відображення форми реєстрації
    };

    // Прив'язка методів до контексту компонента
    this.addToOrder = this.addToOrder.bind(this);  // Прив'язка методу для додавання товару в кошик
    this.deleteOrder = this.deleteOrder.bind(this);  // Прив'язка методу для видалення товару з кошика
    this.chooseCategory = this.chooseCategory.bind(this);  // Прив'язка методу для фільтрації товарів за категорією
    this.onShowItem = this.onShowItem.bind(this);  // Прив'язка методу для відображення детальної інформації товару
    this.updateUser = this.updateUser.bind(this);  // Прив'язка методу для оновлення інформації про користувача
    this.toggleRegistrationForm = this.toggleRegistrationForm.bind(this); // Додано для показу форми
    this.logout = this.logout.bind(this);  // Додано метод для виходу
  }

  // Метод для оновлення інформації про користувача
  updateUser(userInfo) {
    this.setState({ user: userInfo, showRegistration: false });
  }

  // Метод для показу або приховування детальної інформації товару
  onShowItem(item) {
    this.setState((prevState) => ({
      fullItem: item,  // Зберігаємо товар, чию детальну інформацію потрібно відобразити
      showFullItem: !prevState.showFullItem  // Перемикаємо стан відображення деталей товару
    }));
  }

  // Метод для фільтрації товарів за категорією
  chooseCategory(category) {
    if (category === 'all') {
      this.setState({ currentItems: this.state.currentItems });  // Якщо категорія 'всі', відображаємо всі товари
      return;
    }

    // Фільтруємо товари за вибраною категорією
    this.setState({
      currentItems: this.state.currentItems.filter(el => el.category === category)
    });
  }

  // Метод для видалення товару з кошика
  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter(el => el.id !== id) });
  }

  // Метод для додавання товару в кошик
  addToOrder(item) {
    // Перевіряємо, чи вже є цей товар в кошику
    if (!this.state.orders.some(el => el.id === item.id)) {
      // Якщо товар ще не в кошику, додаємо його
      this.setState({ orders: [...this.state.orders, item] });
    }
  }

  // Метод для показу або приховування форми реєстрації
  toggleRegistrationForm() {
    this.setState(prevState => ({
      showRegistration: !prevState.showRegistration,
    }));
  }

  // Метод для виходу з кабінету
  logout() {
    this.setState({ user: null });
  }

  render() {
    const { user, showRegistration, orders, currentItems, fullItem, showFullItem } = this.state;

    return (
      <div className="wrapper">
        {/* Компонент Header: показує кошик і дозволяє видаляти товари з нього */}
        <Header 
          orders={orders}  // Передаємо список замовлень (товарів в кошику)
          onDelete={this.deleteOrder}  // Прив'язуємо метод для видалення товару
          user={user}  // Передаємо інформацію про користувача
        />
        
        {/* Перевірка, чи відображати форму реєстрації */}
        {showRegistration && (
          <RegistrationForm onRegister={this.updateUser} />
        )}

        {/* Компонент Categories: дозволяє вибирати категорії товарів */}
        <Categories chooseCategory={this.chooseCategory} />
  
        {/* Компонент Items: показує всі доступні товари */}
        <Items 
          onShowItem={this.onShowItem}  // Передаємо метод для відкриття детальної інформації
          items={currentItems}  // Передаємо поточний список товарів
          onAdd={this.addToOrder}  // Передаємо метод для додавання товару в кошик
        />

        {/* Якщо потрібно, показує деталі товару */}
        {showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={fullItem} />}
        
        {/* Компонент Footer: підвал сторінки */}
        <Footer />
      </div>
    );
  }
}

// Експортуємо компонент App для використання в інших частинах додатку
export default App;