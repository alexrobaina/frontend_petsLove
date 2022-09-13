import { FC } from "react";
import c from "classnames";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import styles from "./Pagination.module.scss";

interface Props {
  limitOfItems: number;
  page: number;
  totalItems: number;
  handleChangePage: (page: number) => void;
}

const Pagination: FC<Props> = ({
  page,
  totalItems,
  limitOfItems,
  handleChangePage,
}) => {
  const totalPage = Math.floor((totalItems + limitOfItems - 1) / limitOfItems);

  const changePage = (totalPage: number, page: number) => {
    if (page >= totalPage) {
      return totalPage;
    }
    if (page <= 1) {
      return 1;
    }

    return page;
  };

  const renderNumbers = (totalPages: number) => {
    return Array(totalPages)
      .fill(0)
      .map((item, i) => (
        <div
          key={i}
          onClick={() => handleChangePage(i + 1)}
          className={c(
            styles.numberPage,
            page !== i + 1 && styles.camouflage,
            page + 2 < i + 2 && styles.hide,
            page - 4 > i - 2 && styles.hide,
            page === i + 1 && styles.selected
          )}
        >
          {i + 1}
        </div>
      ));
  };

  return (
    <div className={styles.pagination}>
      {totalItems !== 0 && (
        <>
          <div
            onClick={() => handleChangePage(changePage(totalPage, page - 1))}
            className={styles.back}
          >
            <AiOutlineLeft size={10} />
          </div>
          <div className={styles.pagesContainer}>
            {renderNumbers(totalPage)}
          </div>
          <div
            onClick={() => handleChangePage(changePage(totalPage, page + 1))}
            className={styles.next}
          >
            <AiOutlineRight size={10} />
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
