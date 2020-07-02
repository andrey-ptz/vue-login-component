<template>
  <v-app>
		<v-content class="background px-4 pb-4">
      <router-view @login="setParams" :userId="userId" :key="$route.path"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import securityRepository from '@/repositories/securityRepository';

export default {
  name: 'App',

	created() {
		if (this.$route.name !== 'login' && this.$route.name !== 'registration' 
			&& this.$route.name !== 'registrationConfirm') {
			securityRepository.getCurrent()
			.then(response => {
				this.userName = response.data.username;
				this.userId = response.data.id;
			})
			.catch(error => {
				this.$router.push('/login');
			})
		}
		
		this.setTechnicalWorkMessage();
		setInterval(() => this.setTechnicalWorkMessage(), 300000)
	},
	
  data: () => ({
		contactsDialog: false,
		helpDialog: false,
		userName: '',
		userId: null,
		technicalWorkMessage: ''
	}),
	
	methods: {
		setParams(params) {
			this.userName = params.userName;
			this.userId = params.userId;
		},
		setTechnicalWorkMessage() {
			const r = Math.random();
			fetch(`/message.json?${r}`)
				.then(r => r.json())
				.then(json => this.technicalWorkMessage = json)
		},
		logout() {
			securityRepository.logout().then(() => {
				this.userName = '';
				this.userId = null;
				this.$store.dispatch('CLEAR_DATA');
				this.$router.push('/login');
			});
		}
	}
};
</script>
