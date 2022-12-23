import axios from 'axios';

const googleLogin = (accesstoken) => {
	console.log(accesstoken);
	axios
		.post(`http://127.0.0.1:8000/auth/convert-token`, {
			token: accesstoken,
			backend: 'google-oauth2',
			grant_type: 'convert_token',
			client_id: 'qEaPqjHXj0r6vWNLe6VJuXbPs7xUxAVyi1gGj6RM',
			client_secret:
				'jFlbTX64XwcfC2Y7fchsc7jXhSNAxwcrCnyptLQneYIzNOZ5nz0I9VQDfqO5tDWz3xqlI0jT6dDmKzE32rLgNUf1LeLW4lO4fmrgclrnsBxLOIoZrbNi1e2QSI7qwXqI',
		})
		.then((res) => {
            localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
		});
};

export default googleLogin;