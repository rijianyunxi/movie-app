import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: () => import('../views/index/Index'),
		children: [
			{
				path: '',
				redirect: '/home'
			},
			{
				path: '/home',
				name: 'home',
				component: () => import('../views/index/Home'),
			},
			{
				path: '/me',
				name: 'me',
				component: () => import('../views/index/Me')
			},
			{
				path: '/tui',
				name: 'tui',
				component: () => import('../views/index/Tui')
			},
			{
				path: '/shopCar',
				name: 'shopcar',
				component: () => import('../views/index/ShopCar')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login')
	},
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/Search')
	},
	{
		path: '/information',
		name: 'information',
		component: () => import('../views/Information')
	},
	{
		path: '/pay',
		name: 'pay',
		component: () => import('../views/Pay')
	},
	{
		path: '/deal',
		name: 'deal',
		component: () => import('../views/Deal')
	},
	{
		path: '/bought',
		name: 'bought',
		component: () => import('../views/Bought')
	},
]

const router = new VueRouter({
	//mode: 'hash',
	mode: 'history',
	// base: '/',
	routes
})

router.beforeEach((to, from, next) => {
	let public_puth = ['/home', '/tui','/login','/search','/me'];
	if (public_puth.some(r => r == to.path)) {
		next()
	} else {
		if (localStorage.getItem("token")) {
			next()
		} else {
			next({path:'/login'})
		}
	}
})
export default router

