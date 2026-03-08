import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect (() =>{
    async function  fetchPizza() {
      try {
        const {data} = await axios.get(`https://67ee8820c11d5ff4bf79f1be.mockapi.io/items/` + id);
        setPizza(data)
      }catch (error) {
        alert('Не удалось получить данные о пицце');
        console.error('Error fetching pizza data:', error);
        navigate('/')
      }
    }
    fetchPizza();
  },[]);

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container"> 
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  )
}
export default FullPizza;