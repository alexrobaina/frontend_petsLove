import { FC, useState } from "react";
import styles from "./BaseCalendar.module.scss";
import { addDays } from "date-fns";
import { BsFillCalendar2RangeFill } from "react-icons/bs";
import { DateRange } from "react-date-range";
import BaseButton from "../BaseButton";

type DateRangeType = {
  startDate?: Date;
  endDate?: Date;
  key?: string;
};

interface Props {
  handleChange: any;
}

const BaseCalendar: FC<Props> = ({ handleChange }) => {
  const [open, setOpen] = useState(false);
  const [date, setRange]: any = useState({
    startDate: null,
    endDate: (new Date(), 7),
    key: "selection",
  });

  const selectDate = (range: DateRangeType) => {
    handleChange(range);
    setRange(range);
  };

  return (
    <div className={styles.calendarContainer}>
      <BaseButton
        text="Latest"
        onClick={() => setOpen(!open)}
        icon={<BsFillCalendar2RangeFill size={18} />}
      />
      <div onMouseLeave={() => setOpen(!open)} className={styles.calendar}>
        {open && (
          <DateRange
            ranges={[date]}
            editableDateInputs
            className="calendar"
            moveRangeOnFirstSelection={false}
            onChange={(item) => selectDate(item.selection)}
          />
        )}
      </div>
    </div>
  );
};

export default BaseCalendar;
