import { instanse } from './api';
type CaptchaUrl = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instanse.get<CaptchaUrl>(`security/get-captcha-url`).then(res => res.data)
    },
}