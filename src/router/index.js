import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home';
import Login from '../views/Login';
import Registration from '../views/Registration';
import ForgetPassword from '../views/ForgetPassword';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
	},
	{
    path: '/login',
    name: 'login',
    component: Login
	},
	{
		path: '/registration',
		name: 'registration',
    component: Registration
	},
	{
		path: '/registration/:login/:code',
		name: 'registrationConfirm',
    component: Registration
	},
	{
    path: '/forget',
    name: 'forget',
    component: ForgetPassword
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
