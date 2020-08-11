<template>
	<v-row justify="center">
		<v-dialog :value="dialog" max-width="600" @input="closeDialog">
			<v-card>
				<v-card-title class="headline accent--text pb-4">Помощь</v-card-title>
				<v-card-text outlined tile class="border-top">
					<v-container>
						<v-row>
							<v-col cols="12" class="pa-0">
                <p class="mb-0 accent--text">
									По вопросам, связанным с правилами приема, обращайтесь в call-центр приемной комиссии по номеру телефона, указанному в контактах.
								</p>
              </v-col>
              <v-col cols="12" class="pa-1">
                <v-text-field v-model="fullName" label="Фамилия Имя Отчество*" :counter="256"
									:error-messages="fullNameErrors" @input="$v.fullName.$touch()" @blur="$v.fullName.$touch()" />
              </v-col>
              <v-col cols="12" class="pa-1">
                <v-text-field v-model="email" label="E-mail*"
									:error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" />
              </v-col>
              <v-col cols="12" class="pa-1">
                <v-select
									v-model="type"
                  :items="helpTypes"
									:item-text="item => item.name"
                  label="Тип вопроса*"
									:error-messages="typeErrors" 
									@input="$v.type.$touch()" 
									@blur="$v.type.$touch()"
									return-object
                ></v-select>
              </v-col>
							<v-col cols="12" class="pa-1">
								<v-textarea
									v-model="description"
									label="Опишите суть проблемы*"
									:error-messages="descriptionErrors" 
									@input="$v.description.$touch()" 
									@blur="$v.description.$touch()"
									rows="3"
									:counter="4096"
								></v-textarea>
							</v-col>
							<v-col cols="12" class="pa-0 pt-3">
								<v-file-input
									v-model="filesArray"
									label="Приложите файл/файлы в формате JPEG. Ограничение на файл: 5 Мб."
									accept="image/jpeg"
									multiple
									:clearable="false"
									placeholder="Выберите один или несколько файлов"
									prepend-icon="mdi-paperclip"
									outlined
									:show-size="1000"
									@change="changeFilesArray"
								>
									<template v-slot:selection="{ index, text }">
										<v-chip color="blue" dark label small close @click:close="clearFile(index)">
											{{ text }}
										</v-chip>
									</template>
								</v-file-input>
							</v-col>
            </v-row>
					</v-container>
				</v-card-text>				

				<v-card-actions class="pr-4">
					<v-spacer></v-spacer>
					<v-btn text color="lightGrey" @click="closeDialog">Отмена</v-btn>
					<!-- <v-btn color="success" text :disabled="!!$v.$invalid" @click="sendHelp">Отправить</v-btn> -->
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { required, email, maxLength } from 'vuelidate/lib/validators';
// import helpRepository from '@/repositories/helpRepository';

export default {
	props: {
		dialog: {
			type: Boolean
		}
	},

	data: () => ({
		fullName: '',
		email: '',
		type: null,
		helpTypes: [],
		description: '',
		filesArray: [],
		filesArrayCustom: []
	}),
	
	validations: {
		fullName: { required, maxLength: maxLength(256) },
		email: { required, email },
		type: { required },
		description: { required, maxLength: maxLength(4096) }
	},

	computed: {
		fullNameErrors() {
			const errors = [];
			if (!this.$v.fullName.$dirty) return errors;
			!this.$v.fullName.required && errors.push('Обязательное поле');
			!this.$v.fullName.maxLength && errors.push('Не больше 256 символов');
			return errors;
		},
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push('E-mail не валидный');
			!this.$v.email.required && errors.push('Обязательное поле');
			return errors;
		},
		typeErrors() {
			const errors = [];
			if (!this.$v.type.$dirty) return errors;
			!this.$v.type.required && errors.push('Обязательное поле');
			return errors;
		},
		descriptionErrors() {
			const errors = [];
			if (!this.$v.description.$dirty) return errors;
			!this.$v.description.required && errors.push('Обязательное поле');
			!this.$v.description.maxLength && errors.push('Не больше 4096 символов');
			return errors;
		},
	},

	methods: {
		changeFilesArray(newFiles) {
			if (this.filesArrayCustom.length > 0) {
				newFiles.forEach(item => {
					if (!this.filesArrayCustom.find(file => file.name === item.name)) {
						this.filesArrayCustom.push(item);
					}	
				})
				setTimeout(() => this.filesArray = this.filesArrayCustom, 20);
			} else {
				this.filesArrayCustom.push(...newFiles);
			}
		},
		clearFile(index) {
			this.filesArrayCustom.splice(index, 1);
			this.filesArray = this.filesArrayCustom
		},
		closeDialog() {
			this.$emit('input');
			this.$emit('help', false);
			this.clear();
		},
		clear() {
			this.$v.$reset();
			this.fullName = '';
			this.email = '';
			this.type = null;
			this.description = '';
			this.filesArray = [];
		},
		// getHelpTypes() {
		// 	helpRepository.getHelpTypes().then(result => this.helpTypes = result.data);
		// },
		// sendHelp() {
		// 	const sendData = {
		// 		name: this.fullName,
		// 		email: this.email,
		// 		theme: {...this.type},
		// 		comment: this.description
		// 	}
		// 	this.filesArray.length > 0 ? sendData.helpFiles = this.filesArray : '';
		// 	helpRepository.sendHelp(sendData)
		// 		.then(() => {
		// 			console.log('Good sent!');
		// 			this.closeDialog();
		// 		});
		// },
	},
	
	watch: { 
		// dialog: function(value) {
		// 	if (value && this.helpTypes.length === 0) {
		// 		this.getHelpTypes();
		// 	}
		// }
	}
}
</script>

<style lang="sass" scoped>
	.border-top
		border: 0 !important
		border-top: 1px solid rgba(0, 0, 0, 0.12) !important
</style>