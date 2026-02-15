import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
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
