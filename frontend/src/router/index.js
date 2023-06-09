import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);
const router = new Router({
    base: '/dashboard',
    mode: 'history',
    linkActiveClass: 'active',
    routes: paths
});
// router gards
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach((to, from) => NProgress.done());

export default router;
