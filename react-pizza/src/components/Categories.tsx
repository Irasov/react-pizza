
import React, { use } from "react";
//import { useWhyDidYouUpdate } from "ahooks";

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number)  => void;
}

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {
  //useWhyDidYouUpdate('Categories', {value, onChangeCategory} );
  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, index) => (
            <li onClick={() => onChangeCategory(index)} className={value === index ? "active" : ""} key={index}>{categoryName}</li>
          ))
        }
        
      </ul>
    </div>
  );
})

export default Categories;