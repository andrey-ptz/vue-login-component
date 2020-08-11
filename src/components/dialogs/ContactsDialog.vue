<template>
	<v-dialog :value="dialog" max-width="760" @input="closeDialog">
		<v-card>
			<v-card-title class="headline accent--text pb-4">Контакты</v-card-title>

				<v-card outlined tile class="border-top">
					<v-tabs
						v-model="tab"
						background-color="transparent"
						color="primary"
						grow
						class="px-6"
					>
						<v-tab v-for="(item, i) in items" :key="i">
							{{ item.name }}
						</v-tab>
					</v-tabs>

					<v-tabs-items v-model="tab">
						<v-tab-item v-for="(item, i) in items" :key="i">
							<v-card flat>
								<v-card-text class="body-1 accent--text pt-5 px-6">
									<p v-html="item.text" class="mb-0"></p>
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs-items>
				</v-card>				

			<v-card-actions class="pr-4">
				<v-spacer></v-spacer>

				<v-btn color="lightGrey" text @click="closeDialog">
					Понятно
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
  export default {
    props: {
			dialog: {
				type: Boolean
			}
		},
		data () {
      return {
        tab: null,
        items: [
					{
						name: 'Специалитет/Бакалавриат',
						text: 
						`<b>Контакты</b><br>
						 Контакты`
					},
					{
						name: 'Магистратура',
						text: 
						`<b>Контакты</b><br>
						 Контакты`
					},
					{
						name: 'Ординатура',
						text: 
						`<b>Контакты</b><br>
						 Контакты`
					},
					{
						name: 'Аспирантура',
						text: 
						`<b>Контакты</b><br>
						 Контакты`
					}
        ]
      }
    },
		methods: {
			closeDialog() {
				this.$emit('input');
				this.$emit('contacts', false);
			}
		}
  }
</script>

<style lang="sass" scoped>
	.border-top
		border: 0 !important
		border-top: 1px solid rgba(0, 0, 0, 0.12) !important
</style>