import  { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL mutation to add a booking
const ADD_BOOKING = gql`
  mutation AddBooking($user: String!, $destination: String!, $travelDate: String!, $returnDate: String!, $seats: Int!) {
    addBooking(user: $user, destination: $destination, travelDate: $travelDate, returnDate: $returnDate, seats: $seats) {
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

function AddBooking() {
    const [user, setUser] = useState('');
    const [destination, setDestination] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [seats, setSeats] = useState(1);

    const [addBooking] = useMutation(ADD_BOOKING);

    const handleSubmit = (e) => {
        e.preventDefault();
        addBooking({ variables: { user, destination, travelDate, returnDate, seats } });
        // Reset form
        setUser('');
        setDestination('');
        setTravelDate('');
        setReturnDate('');
        setSeats(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>User Name: </label>
                <input value={user} onChange={(e) => setUser(e.target.value)} required />
            </div>
            <div>
                <label>Destination: </label>
                <input value={destination} onChange={(e) => setDestination(e.target.value)} required />
            </div>
            <div>
                <label>Travel Date: </label>
                <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} required />
            </div>
            <div>
                <label>Return Date: </label>
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
            </div>
            <div>
                <label>Seats: </label>
                <input type="number" value={seats} onChange={(e) => setSeats(parseInt(e.target.value))} required />
            </div>
            <button type="submit">Booking</button>
        </form>
    );
}

export default AddBooking;
