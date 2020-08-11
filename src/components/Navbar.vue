<template>
  <div>
		<div class="tech-message text-center body-2 py-3 px-4" ref="techMessage" v-if="!!technicalWorkMessage">
			{{technicalWorkMessage}}
		</div>
    <div class="background custom-header">
			<!-- logo -->
			<router-link to="/" class="d-flex td-none">
				<v-img 
					class="ml-md-4 ml-sm-0 mt-2" 
					max-width="76" 
					max-height="76" 
					src="@/assets/logo.png?1"
				></v-img>
				<v-toolbar-title class="accent--text pl-3 mt-4">
					<p class="mb-0 body" style="line-height: 1.25">Какой то текст</p>
					<p class="mb-0 caption" style="line-height: 1.25">Какой то текст</p>
					<p class="mb-0 caption" style="line-height: 1.25">Какой то текст</p>
					<p class="mb-0 caption" style="line-height: 1.25">Какой то текст</p>
				</v-toolbar-title>
			</router-link>
      <v-spacer></v-spacer>

			<!-- menu -->
			<div class="my-2">
        <v-btn class="lightGrey--text" text @click.stop="$emit('contacts', true)">
					Контакты
				</v-btn>
      </div>
			<div class="my-2">
        <v-btn class="lightGrey--text" text @click.stop="$emit('help', true)">
					Помощь
				</v-btn>
      </div>

      <!-- dropdown menu -->
			<div class="my-2 pr-4" v-if="username">
				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-btn text v-on="on" color="grey">
							<span class="lightGrey--text">{{username}}</span>
							<v-icon right>mdi-chevron-down</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item dense @click="$emit('logout')">
							<v-list-item-title class="accent--text body-1 pointer">
								Выйти
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>	
			</div>

    </div>

  </div>
</template>

<script>
export default {
	props: {
		username: String,
		technicalWorkMessage: String
	}
}
</script>

<style lang="sass" scoped>
	a.td-none
		text-decoration: none
	.pointer
		cursor: pointer
	.tech-message
		display: block
		z-index: 2
		width: 100%
		color: white
		background-color: #e65246
	.custom-header
		display: flex
		z-index: 2
		height: 120px
		width: 100%
</style>