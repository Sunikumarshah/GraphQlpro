import { useQuery, gql } from '@apollo/client';

const GET_BOOKINGS = gql`
  {
    bookings {
      id
      user
      destination
      travelDate
      returnDate
      seats
      status
    }
  }
`;

function BookingList() {
  const { loading, error, data } = useQuery(GET_BOOKINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {data.bookings.map((booking) => (
          <li key={booking.id}>
            <strong>{booking.user}</strong> is traveling to{' '}
            <strong>{booking.destination}</strong> from{' '}
            <strong>{booking.travelDate}</strong> to{' '}
            <strong>{booking.returnDate}</strong>. Seats: {booking.seats}, Status: {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
