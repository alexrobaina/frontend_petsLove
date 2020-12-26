import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './paginationList.module.scss';

interface Props {
  page: number;
  total: number;
  limit: number;
  paginate: Function;
  handleChange: Function;
}

const PaginationList: FC<Props> = ({
  page = 0,
  total = 0,
  limit = 0,
  paginate = null,
  handleChange = null,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.containerPagination}>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <div onClick={() => paginate(number)} className="page-link">
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default observer(PaginationList);
