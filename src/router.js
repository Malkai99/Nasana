import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Board from './components/Board.vue';
import BoardId from './components/BoardId.vue';
import AddBoard from './components/AddBoard.vue';
import Profile from './components/Auth/Profile.vue';
import SignIn from './components/Auth/SignIn.vue';
import SignUp from './components/Auth/SignUp.vue';
import AuthGuard from './AuthGuard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/boards',
      name: 'Board',
      component: Board
    },
    {
      path: '/boards/:boardId',
      name: 'BoardId',
      component: BoardId,
      props: true
    },
    {
      path: '/board/add',
      name: 'AddBoard',
      component: AddBoard,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },


  ]
})
