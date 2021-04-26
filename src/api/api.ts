import axios from 'axios';
import { UsersType } from '../type/type';

export const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "09c68216-25d3-4d4f-8b02-ebd9b0912430"
    }
})

export enum AuthApiEnum {
    Success = 0,
    Error = 1
}
export enum AuthApiCaptchaEnum {
    Captcha = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export type AuthApiType<D = {}, RS = AuthApiEnum> = {
    data: D
    resultCode: RS
    messages: Array<string>
}