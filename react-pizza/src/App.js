import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Вегетарианская" price={420} />
            <PizzaBlock title="Гавайская" price={450} />
            <PizzaBlock title="Маргарита" price={380} />
            <PizzaBlock title="Пепперони" price={410} />
            <PizzaBlock title="Карбонара" price={430} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
