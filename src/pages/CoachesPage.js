import { useQuery } from '@tanstack/react-query';
import { List } from 'antd';
import { Link } from 'react-router-dom';

const CoachesPage = () => {
  const { data = { records: [] } } = useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      const response = await fetch('/api/v1/coaches', {
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      return data;
    },
  })

  console.log(data)

  return (
    <List
      bordered
      dataSource={data.records}
      renderItem={(coach) => (
        <List.Item>
          <Link to={`/coaches/${coach.id}/calendar`}>
            {coach.full_name}
          </Link>
        </List.Item>
      )}
    />
  );
};

export default CoachesPage;
