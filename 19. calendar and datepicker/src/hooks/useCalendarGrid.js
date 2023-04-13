import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

import selectedDateStateFamily from '../recoil/atoms/selectedDateStateFamily';

const useCalendarGrid = (pickerId, currentDate) => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateStateFamily(pickerId));

  const fullCalendar = useMemo(() => {
    const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const from = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - firstDate.getDay());

    return Array.from({ length: firstDate.getDay() + lastDate.getDate() + (7 - (lastDate.getDay() + 1)) }, (_, i) => {
      if (i !== 0) from.setDate(from.getDate() + 1);
      return new Date(from);
    });
  }, [currentDate]);

  const isSameDate = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const isToday = date => isSameDate(date, new Date());
  const isSelected = date => isSameDate(date, new Date(selectedDate));
  const isMuted = date => date.getMonth() !== currentDate.getMonth();

  return {
    fullCalendar,
    isToday,
    isSelected,
    isMuted,
    handleClickDate: setSelectedDate,
  };
};

export default useCalendarGrid;
