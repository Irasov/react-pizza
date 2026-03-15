import React from 'react';
import qs from 'qs'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../components/Pagination";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/filter/slice"
import { selecFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';
import { SearchPizzasParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const {items, status} = useSelector(selectPizzaData );
  const {categoryId, sort, currentPage, searchValue} = useSelector(selecFilter);

  const onChangeCategory =  React.useCallback((idx: number) => {
    dispath(setCategoryId(idx));
  }, []);
  
  const onChangePage = (page: number) => {
    dispath(setCurrentPage(page));
  }
  const getPizzas = async () =>{
      const sortBy = sort.sortProperty.replace('-','');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}`: '';
      const search = searchValue ? `&search=${searchValue}` : '';
      dispath(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage: String(currentPage)
      }));
  };

//Если был уже первый рендер и произошли изменения параметров то вшивай параметры в адресную строчку 
  React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  },[categoryId, sort.sortProperty, searchValue, currentPage])

  //Если был первый рендер, то проверяем URL-параметры и сохр. в Redux
  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzasParams;
      const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
      dispath(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
      isSearch.current = true;
    }
  },[])

  //Если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if(!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj:any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories  value={categoryId} onChangeCategory={(id: number) => onChangeCategory(id)}/>
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка <span>😕</span></h2>
          <p>
            К сожалению,не удалось получить пиццы. Попробуйте повторить попытку позже.
          </p>
        </div>) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
        )
      }
      < Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}

export default Home;