import axios from 'axios';

const googleLogin = (accesstoken) => {
	console.log(accesstoken);
	axios
		.post('http://127.0.0.1:8000/api-auth/convert-token', {
			token: accesstoken,
			backend: 'google-oauth2',
			grant_type: 'convert_token',
			client_id: 'HrbCjPsLE4u8FKwePeegl2PbZNPagkxJpCtuxtXo',
			client_secret:
				'ymYAZVI1NLFQkXOUstwxxn8o867dA9LbEWlipujXoabIY3pZyc8zYqtb0vnEtiEIYKVmC3qgWsRcmlInOz9h3yXTwpJghNG29InWKgZzvfUOkFlr98TlJtOt35LbXy8g',
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
		});
};

export default googleLogin;