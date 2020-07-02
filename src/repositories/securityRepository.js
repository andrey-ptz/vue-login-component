import axios from 'axios';

const api = '/api';

export default {
	async login(data) {
		return await axios.post(api + `/auth/login`, data);
	},

	async superLogin(userName) {
		return await axios.post(api + `/admin/becomeUser?username=${userName}`);
	},

	async getCurrent() {
		return await axios.get(api + `/user/current`);
	},

	async logout() {
		const response = await axios.post(api + '/auth/logout');
	},

	async startRegistration(data) {
		const body = { login: data };
		return await axios.post(api + '/registration/start', body);
	},

	async confirmRegistration(data) {
		return await axios.post(api + '/registration/confirmation', data);
	}
}