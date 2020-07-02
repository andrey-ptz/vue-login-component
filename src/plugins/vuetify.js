import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
    iconfont: 'mdi',
	},
	theme: {
    themes: {
      light: {
        background: colors.indigo.lighten5,
        primary: colors.blue,
				error: colors.red.accent2,
				success: colors.green.darken1,
				accent: colors.blueGrey.darken3,
				lightGrey: colors.blueGrey.lighten2
      }
    }
  }
});