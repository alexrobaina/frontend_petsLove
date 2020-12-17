import { FC, useRef, ChangeEvent } from 'react';
import c from 'classnames';
import { FcSearch } from 'react-icons/fc';
import Input from 'components/common/Input';
import Filters from './Filters';
import styles from './button.module.scss';

interface Props {
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<Props> = ({ handleSearch }) => {
  const searchInputRef = useRef<HTMLElement | null>(null);

  return (
    <div>
      <Filters />
      <Input
        name="search"
        onChange={handleSearch}
        inputRef={searchInputRef}
        icon={<FcSearch size={25} />}
      />
    </div>
  );
};

export default Search;
