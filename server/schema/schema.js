const graphql = require('graphql');
const Booking = require('../models/Booking');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID, GraphQLSchema, GraphQLNonNull, GraphQLError } = graphql;

// Booking Type
const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        id: { type: GraphQLID },
        user: { type: GraphQLString },
        destination: { type: GraphQLString },
        travelDate: { type: GraphQLString },
        returnDate: { type: GraphQLString },
        seats: { type: GraphQLInt },
        status: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        booking: {
            type: BookingType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Booking.findById(args.id);
            }
        },
        bookings: {
            type: new GraphQLList(BookingType),
            args: {
                limit: { type: GraphQLInt },
                offset: { type: GraphQLInt }
            },
            resolve(parent, args) {
                const limit = args.limit || 10; // Default limit
                const offset = args.offset || 0;
                return Booking.find({}).skip(offset).limit(limit);
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBooking: {
            type: BookingType,
            args: {
                user: { type: new GraphQLNonNull(GraphQLString) },
                destination: { type: new GraphQLNonNull(GraphQLString) },
                travelDate: { type: new GraphQLNonNull(GraphQLString) },
                returnDate: { type: new GraphQLNonNull(GraphQLString) },
                seats: { type: new GraphQLNonNull(GraphQLInt) },
                status: { type: GraphQLString }
            },
            resolve(parent, args) {
                // Input validation for dates, and default status
                if (!args.user || !args.destination) {
                    throw new GraphQLError('User and destination are required fields');
                }

                let booking = new Booking({
                    user: args.user,
                    destination: args.destination,
                    travelDate: args.travelDate,
                    returnDate: args.returnDate,
                    seats: args.seats,
                    status: args.status || 'pending'  // Default to 'pending' if no status provided
                });

                // Error handling while saving booking
                try {
                    return booking.save();
                } catch (err) {
                    throw new Error('Error while saving booking: ' + err.message);
                }
            }
        },
        updateBookingStatus: {
            type: BookingType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                status: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                // Validating that the provided status is within acceptable values
                const validStatuses = ['pending', 'confirmed', 'cancelled'];
                if (!validStatuses.includes(args.status)) {
                    throw new GraphQLError('Invalid status value');
                }

                // Error handling while updating booking status
                try {
                    return Booking.findByIdAndUpdate(
                        args.id,
                        { status: args.status },
                        { new: true } // Return the updated document
                    );
                } catch (err) {
                    throw new Error('Error while updating booking status: ' + err.message);
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
