import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { List } from 'antd';
import { useParams } from 'react-router-dom';

const SlotsPage = () => {
  const { coachId, date } = useParams();

  const { data = { records: [] } } = useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await fetch(`/api/v1/coaches/${coachId}/slots?date=${date}&timezone=${timezone}`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      return data;
    },
  });

  const onReserveClick = useCallback(async (e) => {
    await fetch(`/api/v1/slots/${e.target.dataset.slotId}/reserve`, {
      method: 'POST',
      body: JSON.stringify({
        slot: {
          date,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    window.location.reload();
  }, [date]);

  return (
    <List
      bordered
      dataSource={data.records}
      renderItem={(slot) => (
        <List.Item>
          {slot.reserved ? 'Reserved' : 'Available'} ({new Date(slot.available_at).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} - {new Date(slot.available_until).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })})

          {!slot.reserved && <button data-slot-id={slot.id} onClick={onReserveClick}>Reserve</button>}
        </List.Item>
      )}
    />
  );
};

export default SlotsPage;
