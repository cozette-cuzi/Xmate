import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import api from "./constants/api";
import {setMomentTime} from "@/util";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')),
    },
    mutations: {
        LOGIN(state, user) {
            state.user = user;
            setMomentTime(user.timestamp);
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
            localStorage.setItem('user', JSON.stringify(user));
        },
        LOGOUT(state) {
            try {
                axios.defaults.headers.common['Authorization'] = ``;
                state.user = null;
                localStorage.removeItem('user');
                if (state.socket) state.socket.disconnect();
            } catch (e) {
                console.log(e);
            }
        },
    },
    actions: {
        async validateToken({commit, state},token = null) {
            try {
                let baseUser;
                if (!token) {
                    baseUser = state.user;
                    token = baseUser.accessToken;
                } else {
                    baseUser = {
                        accessToken: token
                    }
                }


                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const {data: {data: user}} = await axios.get(api.ACTIONS.CHECK_TOKEN);
                await commit('LOGIN', Object.assign({}, baseUser, user));
            } catch (e) {
                commit('LOGOUT');
            }
        },
    }
});
