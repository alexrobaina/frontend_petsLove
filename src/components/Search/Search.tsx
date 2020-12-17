import { FC } from 'react';
import c from 'classnames';
import { FcSearch } from 'react-icons/fc';
import Input from 'components/common/Input';
import styles from './button.module.scss';

interface Props {
  handleSearch: Function;
}

const Search: FC<Props> = ({ handleSearch }) => {
  return (
    <div>
      <Input icon={<FcSearch size={25} />} />
    </div>
  );
};

export default Search;
