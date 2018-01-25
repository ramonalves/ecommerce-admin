import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/user/Login'
import Logout from '@/components/user/Logout'
import EditProfile from '@/components/user/EditProfile'
import store from '@/states'
import CategoryList from '@/components/category/CategoryList'
import CategoryNew from '@/components/category/CategoryNew'
import CategoryShow from '@/components/category/CategoryShow'
import CategoryEdit from '@/components/category/CategoryEdit'
import CategoryRemove from '@/components/category/CategoryRemove'
import ProductList from '@/components/product/ProductList'
import ProductNew from '@/components/product/ProductNew'
import ProductShow from '@/components/product/ProductShow'
import ProductEdit from '@/components/product/ProductEdit'
import ProductCategory from '@/components/product/ProductCategory'
import ProductRemove from '@/components/product/ProductRemove'
import CustomerList from '@/components/customer/CustomerList'
import CustomerShow from '@/components/customer/CustomerShow'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: { requiresAuth: true }
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/edit-profile/:id',
      name: 'EditProfile',
      component: EditProfile
    },

    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    // Rotas para Category
    {
      path: '/categories',
      name: 'CategoryList',
      component: CategoryList,
      meta: { requiresAuth: true }
    },
    {
      path: '/categories/new',
      name: 'CategoryNew',
      component: CategoryNew,
      meta: { requiresAuth: true }
    },
    {
      path: '/categories/show/:id',
      name: 'CategoryShow',
      component: CategoryShow,
      meta: { requiresAuth: true }
    },
    {
      path: '/categories/edit/:id',
      name: 'CategoryEdit',
      component: CategoryEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/categories/remove/:id',
      name: 'CategoryRemove',
      component: CategoryRemove,
      meta: { requiresAuth: true }
    },

    // Rotas para Product
    {
      path: '/products',
      name: 'ProductList',
      component: ProductList,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/new',
      name: 'ProductNew',
      component: ProductNew,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/show/:id',
      name: 'ProductShow',
      component: ProductShow,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/edit/:id',
      name: 'ProductEdit',
      component: ProductEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/remove/:id',
      name: 'ProductRemove',
      component: ProductRemove,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/categories/:id',
      name: 'ProductCategory',
      component: ProductCategory,
      meta: { requiresAuth: true }
    },

    // Rotas para cliente
    {
      path: '/customers',
      name: 'CustomerList',
      component: CustomerList,
      meta: { requiresAuth: true }
    },
    {
      path: '/customers/show/:id',
      name: 'CustomerShow',
      component: CustomerShow,
      meta: { requiresAuth: true }
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  let requiresAuth = to.meta.requiresAuth || false

  let token = store.state.user.token

  if (token) {
    window.axios.defaults.headers.common['Authorization'] = 'bearer ' + token
  }

  if (requiresAuth) {
    return store.dispatch('getCurrentUser')
      .then(() => {
        return next()
      })
      .catch(() => {
        return next({path: 'login'})
      })
  }
  return next()
})
