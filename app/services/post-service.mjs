export const validate = (req) => {
    const {username, firstName, lastName, destination, body, seatsLeft} = req;
    return Boolean(username && firstName && lastName && destination && body && seatsLeft);
};