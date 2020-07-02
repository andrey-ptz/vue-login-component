<template>
	<v-container>
		<v-row class="my-4 mx-auto" style="max-width:500px">

			<v-col cols="12" class="custom-title background">
				<h1 class="text-center accent--text mb-0">Восстановление пароля</h1>
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
								<v-row class="mx-0">
									<v-col cols="12" class="pa-0 pt-1 ma-0">
										<v-text-field 
											class="pa-0 ma-0" 
											v-model="email"
											label="Электронная почта" 
											:error-messages="emailErrors" 
											@input="$v.email.$touch()" 
											@blur="$v.email.$touch()"
										/>
									</v-col>

									<v-col cols="6" class="pa-0 mt-4">
										<v-btn depressed color="primary" class="mr-2" :disabled="$v.$invalid">
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
							<div v-if="i === 1">
								<!-- <v-row class="mx-0">
									<v-col cols="12" class="pa-0 pt-1 ma-0">
										<v-text-field 
											class="pa-0 ma-0" 
											label="Телефон" 
										/>
									</v-col>
									<v-col cols="12" class="pa-0 ma-0 px-0">
										<v-checkbox 
											v-model="phoneCheckbox" 
											:label="checkboxDescription" 
										/>
									</v-col>
									<v-col cols="6" class="pa-0 mt-4">
										<v-btn depressed color="primary" class="mr-2">Отправить</v-btn>
									</v-col>
									<v-col cols="6" class="pa-0 mt-5 text-right">
										<v-btn text small color="primary" class="px-2" to="/login">
											Страница входа
										</v-btn>
									</v-col>
								</v-row> -->
							</div>
							
						</v-tab-item>
					</v-tabs-items>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
	name: 'forget',
	metaInfo: {
		title: 'Восстановление пароля'
	},

	data: () => ({
		regTab: null,
		regOptions: [
			{ id: 1, name: 'Электронная почта'},
			{ id: 2, name: 'Телефон'}
		],
		email: '',
		phoneNumber: '',
		emailCheckbox: false,
		phoneCheckbox: false
	}),

	validations: {
		email: { required, email }
	},

	computed: {
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push('E-mail не валидный');
			return errors;
		}
	},

	methods: {

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