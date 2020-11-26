import { store } from '../store';

export default (to, from, next) => {
    console.log(store.state.user);
    if (store.state.user) {
        next();
    } else {
        next('/');
    }
}