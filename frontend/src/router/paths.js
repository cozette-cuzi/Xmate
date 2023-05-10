import store from "../store";

export default [
    {
        path: '*',
        meta: {
            public: true,
        },
        redirect: {
            path: '/404'
        }
    },
    {
        path: '/404',
        meta: {
            public: true,
        },
        name: 'NotFound',
        component: () => import(
            /* webpackChunkName: "routes" */
            `@/views/NotFound.vue`
            )
    },
    {
        path: '/login',
        meta: {
            public: true,
        },
        name: 'Login',
        component: () => import(
            /* webpackChunkName: "routes" */
            `@/views/Login.vue`
            ),
        beforeEnter(to, from, next) {
            if (store.state.user) next('Home');
            else next();
        }
    },
    {
        path: '/register',
        meta: {
            public: true,
        },
        name: 'RegisterComponent',
        component: () => import('@/views/RegisterComponent')
    },
    {
        path: '',
        meta: {breadcrumb: true},
        name: 'Root',
        async beforeEnter(to, from, next) {
            await store.dispatch('validateToken');
            if (!store.state.user) next(`login?next=${to.name}`);
            else {
                next();
            }
        },
        component: () => import("@/components/RootComponent"),
        redirect: {name: "Home"},
        children: [
            {
                path: '/home',
                meta: {breadcrumb: true, title: "Home"},
                name: "Home",
                component: () => import("@/views/Home")
            },
            {
                path: '/groups',
                meta: {breadcrumb: true, title: "Groups"},
                name: "Groups",
                component: () => import("@/views/Groups")
            },
            {
                path: '/group/:id',
                meta: {breadcrumb: true, title: "Group"},
                name: 'Group',
                props: {
                    default: true
                },
                component: () => import("@/views/Group")
            },
            {
                path: '/users/:id',
                meta: {breadcrumb: true, title: "User Profile"},
                name: 'UserProfile',
                component: () => import("@/views/users/Profile")
            },

        ]
    },
]
;
