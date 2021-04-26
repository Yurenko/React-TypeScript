import { AuthApiCaptchaEnum, AuthApiEnum, AuthApiType, instanse } from './api';

type AuthApiDataType = {
    id: number
    email: string
    login: string
}
type LoginApiDataType = {
        userId: number
}

export const authAPI = {
    me() {
        return instanse.get<AuthApiType<AuthApiDataType>>(`auth/me`).then(res => res.data)
            
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instanse.post<AuthApiType<LoginApiDataType, AuthApiEnum | AuthApiCaptchaEnum>>(`/auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instanse.delete(`/auth/login`)
            .then(res => res.data)
    }
}