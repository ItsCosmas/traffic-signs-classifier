let API_ROUTE;

process.env.NODE_ENV === 'development'
	? (API_ROUTE = 'http://0.0.0.0:5000')
	: (API_ROUTE = 'https://api.trafficsigns.com');

export default API_ROUTE;
