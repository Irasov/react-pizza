import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} // захардкодили кол-во страниц, т.к. в API нет данных о кол-ве страниц
      forcePage={currentPage - 1} // текущая страница
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
