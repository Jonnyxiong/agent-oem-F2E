import store from '../store';
import * as types from '../store/types';
import {Utils} from '@/model/util';
let utils = new Utils();

let isLogged = false;
export const auth = {
    requireAuth(to, from, next) {
        utils.get("/login/timeout").then(res => {
            console.log(res.data);
            if(res.data){
                store.commit(types.ISLOGGED, {login:true})
                next();
            } else {
                store.commit(types.ISLOGGED, {login:false})
                next({ path: '/login', query: { redirect: to.fullPath } });
            }
        }, res => {

        })
       
    },
}