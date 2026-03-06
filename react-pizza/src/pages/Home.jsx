import React from 'react';
import qs from 'qs'
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  //const categoryId = useSelector((state) => state.filter.categoryId);
  //const sortType = useSelector((state) => state.filter.sort.sortProperty);
  //ниже сокращенная запись
  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);

  const{searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispath(setCategoryId(id));
  }
  const onChangePage = number => {
    dispath(setCurrentPage(number));
  }
  const fetchPizzas = async () =>{
    setIsLoading(true); 
      const sortBy = sort.sortProperty.replace('-','');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}`: '';
      const search = searchValue ? `&search=${searchValue}` : '';

      // await axios.get(`
      //   https://67ee8820c11d5ff4bf79f1be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      // )
      // .then(response => {
      //   setItems(response.data);
      //   setIsLoading(false);
      // })
      // .catch((err) => {
      //   setIsLoading(false);
      //   console.error(err);
      // });
      try {
        const res = await axios.get(`
          https://67ee8820c11d5ff4bf79f1be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        setItems(res.data);
      } catch (err) {
          console.error(err);
      } finally {
        setIsLoading(false);
      }
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
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
      dispath(
        setFilters({
          ...params,
          sort
        })
      );
      isSearch.current = true;
    }
  },[])

  //Если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current){
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories  value={categoryId} onChangeCategory={(id) => onChangeCategory(id)}/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      < Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}

export default Home;