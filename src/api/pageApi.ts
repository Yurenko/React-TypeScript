import { instanse } from './api';
export const PageAPI = {
    GetUser: (friend: null | boolean) => {
        return instanse.get(`users?friend=${friend}`).then(res => res.data)
    }
}