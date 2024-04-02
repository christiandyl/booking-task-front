import { useCallback } from 'react';
import { Calendar } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const CalendarPage = () => {
  const { coachId } = useParams();
  const navigate = useNavigate();

  const onDateSelect = useCallback((value) => {
    navigate(`/coaches/${coachId}/calendar/${value.format('YYYY-MM-DD')}`)
  }, [navigate, coachId]);

  return (
    <Calendar onSelect={onDateSelect} />
  );
};

export default CalendarPage;
