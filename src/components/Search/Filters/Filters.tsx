import { FC } from "react";
import { GiCat } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { GoSquirrel } from "react-icons/go";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import ButtonFilter from "../ButtonFilter";
import styles from "./filters.module.scss";

interface Props {
  sex: string;
  category: string;
  handleSelectSex: (textAddress: string) => void;
  handleSelectCategory: (textAddress: string) => void;
}

const Filters: FC<Props> = ({
  sex,
  category,
  handleSelectSex,
  handleSelectCategory,
}) => {
  return (
    <div className={styles.containerFilters}>
      <ButtonFilter
        icon={<GiCat size={26} />}
        isSelected={category === "cat"}
        handleSelected={() => handleSelectCategory("cat")}
      />
      <ButtonFilter
        icon={<FaDog size={26} />}
        isSelected={category === "dog"}
        handleSelected={() => handleSelectCategory("dog")}
      />
      <ButtonFilter
        icon={<GoSquirrel size={26} />}
        isSelected={category === "exotic"}
        handleSelected={() => handleSelectCategory("exotic")}
      />
      <ButtonFilter
        isSelected={sex === "female"}
        icon={<IoMdFemale size={26} />}
        handleSelected={() => handleSelectSex("female")}
      />
      <ButtonFilter
        isSelected={sex === "male"}
        icon={<IoMdMale size={26} />}
        handleSelected={() => handleSelectSex("male")}
      />
    </div>
  );
};

export default Filters;
