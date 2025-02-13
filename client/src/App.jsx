// import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import BookingList from './components/BookingList';
import AddBooking from './components/AddBooking';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>Travel Booking System</h1>
        <AddBooking />
        <BookingList />
      </div>
    </ApolloProvider>
  );
}

export default App;
