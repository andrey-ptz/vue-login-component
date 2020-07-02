<template>
	<v-container>
		<v-row class="my-4 mx-auto" style="max-width:500px">

			<v-col cols="12" class="custom-title background">
				<h1 class="text-center accent--text mb-0">Регистрация</h1>
			</v-col>

			<v-col cols="12" class="custom-content">

				<v-card outlined elevation="2" class="pt-4 pb-8 px-8">
					<v-tabs
						v-model="regTab"
						background-color="transparent"
						color="primary"
						grow
					>
						<v-tab v-for="(option, i) in regOptions" :key="i" :disabled="i === 1" class="lightGrey--text">
							{{ option.name }}
						</v-tab>
					</v-tabs>

					<v-tabs-items v-model="regTab" class="pt-6">
						<v-tab-item v-for="(option, i) in regOptions" :key="i">
							<div v-if="i === 0">
								<v-row class="mx-0" v-if="regType === 1">
									<v-col cols="12" class="pa-0 pt-1 ma-0" v-if="!isStartFlag">
										<v-text-field 
											class="pa-0 ma-0" 
											v-model="email"
											label="Электронная почта" 
											:error-messages="emailErrors" 
											@input="$v.email.$touch()" 
											@blur="$v.email.$touch()"
										/>
									</v-col>

									<v-col cols="1" class="ma-0 px-0 py-5" v-if="!isStartFlag">
										<v-checkbox 
											class="mt-0 pt-0"
											v-model="emailCheckbox" 
										/>
									</v-col>
									<v-col cols="11" class="ma-0 px-0 py-5" v-if="!isStartFlag">
										<div class="grey-text" @click="emailCheckbox = !emailCheckbox">
											{{checkboxDescription}}
										</div>
									</v-col>
									
									<v-col cols="12" class="pa-0 mt-4" v-if="isStartFlag">
										<v-alert type="info" outlined class="body-2">
											На Ваш почтовый ящик отправлено письмо, содержащее ссылку для подтверждения регистрации
										</v-alert>
									</v-col>

									<v-col cols="6" class="pa-0 mt-4" v-if="!isStartFlag">
										<v-btn 
											depressed 
											color="primary" 
											class="mr-2" 
											:disabled="$v.$invalid || !emailCheckbox"
											@click="startRegistration"
										>
											Отправить
										</v-btn>
									</v-col>
									<v-col :cols="!isStartFlag ? 6 : 12" class="pa-0 mt-5 text-right">
										<v-btn text small color="primary" class="px-2" to="/login">
											Страница входа
										</v-btn>
									</v-col>
								</v-row>

								<v-row class="mx-0" v-if="regType === 2">
									<v-col cols="12" class="pa-0 pt-3 ma-0">
										<v-text-field 
											disabled
											class="pa-0 ma-0" 
											v-model="login"
											label="Электронная почта" 
										/>
									</v-col>

									<v-col cols="12" class="pa-0 pt-3 ma-0">
										<v-text-field 
											class="pa-0 ma-0" 
											v-model="password"
											type="password"
											label="Пароль" 
											:error-messages="passwordErrors" 
											@input="$v.password.$touch()" 
											@blur="$v.password.$touch()"
										/>
									</v-col>

									<v-col cols="12" class="pa-0 pt-3 ma-0">
										<v-text-field 
											class="pa-0 ma-0" 
											v-model="passwordConfirm"
											type="password"
											label="Подтверждение пароля" 
											:error-messages="passwordConfirmErrors" 
											@input="$v.passwordConfirm.$touch()" 
											@blur="$v.passwordConfirm.$touch()"
										/>
									</v-col>

									<v-col cols="6" class="pa-0 mt-4">
										<v-btn 
											depressed 
											color="primary" 
											class="mr-2" 
											:disabled="$v.$invalid"
											@click="confirmRegistration"
										>
											Зарегистрироваться
										</v-btn>
									</v-col>
									<v-col cols="6" class="pa-0 mt-5 text-right">
										<v-btn text small color="primary" class="px-2" to="/login">
											Страница входа
										</v-btn>
									</v-col>
								</v-row>
							</div>

							<div v-if="i === 1">
								<v-row class="mx-0" v-if="regType === 2">
									<v-col cols="12" class="pa-0 pt-1 ma-0">
										<v-text-field 
											class="pa-0 ma-0" 
											v-model="phone"
											label="Телефон" 
										/>
									</v-col>
									<v-col cols="1" class="ma-0 px-0 py-5">
										<v-checkbox 
											class="mt-0 pt-0"
											v-model="phoneCheckbox" 
										/>
									</v-col>
									<v-col cols="11" class="ma-0 px-0 py-5">
										<div class="grey-text" @click="phoneCheckbox = !phoneCheckbox">
											{{checkboxDescription}}
										</div>
									</v-col>

									<v-col cols="6" class="pa-0 mt-4">
										<v-btn depressed color="primary" class="mr-2" :disabled="$v.$invalid || !phoneCheckbox">
											Отправить
										</v-btn>
									</v-col>
									<v-col cols="6" class="pa-0 mt-5 text-right">
										<v-btn text small color="primary" class="px-2" to="/login">
											Страница входа
										</v-btn>
									</v-col>
								</v-row>
							</div>
							
						</v-tab-item>
					</v-tabs-items>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import securityRepository from '@/repositories/securityRepository';
import { required, requiredIf, email, sameAs } from 'vuelidate/lib/validators';

export default {
	name: 'login',
	metaInfo: {
		title: 'Регистрация'
	},

	created() {
		if (this.$route.name === 'registration') {
			this.regType = 1;
		} else if (this.$route.name === 'registrationConfirm') {
			this.regType = 2;
			this.login = this.$route.params.login;
			this.code = this.$route.params.code;
		}
	},

	data: () => ({
		regType: null,
		regTab: null,
		regOptions: [
			{ id: 1, name: 'Электронная почта'},
			{ id: 2, name: 'Телефон'}
		],
		checkboxDescription: `Нажимая кнопку «Отправить», я подтверждаю свою дееспособность, 
		даю согласие на обработку ФГБОУ ВО СЗГМУ им. И.И. Мечникова моих персональных данных, 
		а именно на их сбор, систематизацию, накопление, хранение, уточнение (обновление, изменение), 
		использование, обезличивание, блокирование, передачу, уничтожение.`,
		email: '',
		phone: '',
		emailCheckbox: false,
		phoneCheckbox: false,
		isStartFlag: false,
		login: '',
		code: null,
		password: '',
		passwordConfirm: ''
	}),

	validations: {
		email: { 
			required: requiredIf(function(){
				return this.regType === 1;
			}), 
			email 
		},
		login: {
      required: requiredIf(function(){
				return this.regType === 2;
			})
    },
		password: {
      required: requiredIf(function(){
				return this.regType === 2;
			})
    },
    passwordConfirm: {
      sameAsPassword: sameAs('password')
    }
	},

	computed: {
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push('E-mail не валидный');
			return errors;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.password.$dirty) return errors;
			!this.$v.password.required && errors.push('Пароль не может быть пустым');
			return errors;
		},
		passwordConfirmErrors() {
			const errors = [];
			if (!this.$v.passwordConfirm.$dirty) return errors;
			!this.$v.passwordConfirm.sameAsPassword && errors.push('Пароли не совпадают');
			return errors;
		}
	},

	methods: {
		startRegistration() {
			securityRepository.startRegistration(this.email).then(response => {
				this.isStartFlag = true;
			})
		},
		confirmRegistration() {
			const body = {
				code: this.code,
				login: this.login,
				password: this.password
			}

			securityRepository.confirmRegistration(body).then(response => {
				this.$router.push('/login');
			})
		}
	}
};
</script>

<style lang="sass" scoped>
	.grey-text
		color: rgba(0, 0, 0, .6)
		line-height: 20px
		cursor: pointer

	.theme--light.v-btn.v-btn--disabled
		color: white !important

	.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text)
		background-color: #cfd8dc !important

	.custom-title
		margin-top: 90px
		position: fixed
		max-width: 500px
		z-index: 2

	.custom-content
		margin-top: 170px
</style>