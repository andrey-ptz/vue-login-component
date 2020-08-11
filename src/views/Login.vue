<template>
	<v-container>
		<v-row class="my-4 mx-auto" style="max-width:500px">

			<v-col cols="12" class="custom-title background">
				<h1 class="text-center accent--text mb-0">Вход</h1>
			</v-col>

			<v-col cols="12" class="custom-content">
				<v-card outlined elevation="2" class="pa-8 pr-6" @keydown.enter="goLogin">

					<v-alert dense outlined type="error" class="mr-2" v-if="errorFlag">
						Неправильная пара логин-пароль
					</v-alert>

					<v-row class="mx-0">
						<v-col cols="12" class="pa-0 ma-0 pr-2">
							<v-text-field 
								v-model="login"
								class="pa-0 pt-2 ma-0" 
								label="Телефон или электронная почта"
								:error-messages="loginErrors"  
								@input="$v.login.$touch()" 
								@blur="$v.login.$touch()"
							/>
						</v-col>
						<v-col cols="12" class="pa-0 ma-0 pr-2">
							<v-text-field 
								v-model="password"
								class="pt-3 ma-0" 
								label="Пароль" 
								type="password"
								:error-messages="passwordErrors" 
								@input="$v.password.$touch()" 
								@blur="$v.password.$touch()"
							/>
						</v-col>
					</v-row>

					<v-row class="mx-0">
						<v-col cols="8" class="pa-0 mt-4">
							<v-btn depressed color="primary" class="mr-2" :loading="loading" @click="goLogin"> 
								<v-icon left>mdi-login-variant</v-icon> Войти
							</v-btn>
							<v-btn text small color="primary" class="px-2" to="/forget">
								Забыли пароль?
							</v-btn>
						</v-col>
						<v-col cols="4" class="pa-0 mt-4 text-right">
							<v-btn text small color="primary" class="mt-1 px-2" to="/registration">
								Регистрация
							</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import securityRepository from '@/repositories/securityRepository';
import { maxLength } from 'vuelidate/lib/validators';

export default {
	name: 'login',
	metaInfo: {
		title: 'Вход'
	},

	data: () => ({
		login: '',
		password: '',
		loading: false,
		errorFlag: false
	}),

	validations() {
		return {
			login: { maxLength: maxLength(50) },
			password: { maxLength: maxLength(50) }
		}
	},

	computed: {
		loginErrors() {
			const errors = [];
			if (!this.$v.login.$dirty) return errors;
			!this.$v.login.maxLength && errors.push('Не больше 50 символов');
			return errors;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.password.$dirty) return errors;
			!this.$v.password.maxLength && errors.push('Не больше 50 символов');
			return errors;
		}
	},

	methods: {
		goLogin() {
			this.errorFlag = false;
			this.loading = true;

			let formData = new FormData();
			formData.append('username', this.login);
			formData.append('password', this.password);

			securityRepository.login(formData)
				.then(response => {
					if (response.data.username) {
						this.$emit("login", { userId: response.data.id, userName: response.data.username });
						this.$router.push('/');
					}
				})
				.catch(error => error.response.status === 422 ? this.errorFlag = true : '')
				.finally(() => this.loading = false)
		}
	}
};
</script>

<style lang="sass" scoped>

</style>