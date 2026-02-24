import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} // захардкодили кол-во страниц, т.к. в API нет данных о кол-ве страниц
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
