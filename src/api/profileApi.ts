import { PhotosType } from './../type/type';
import { ProfileType } from "../type/type";
import { AuthApiType, instanse } from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}
export const profileAPI = {
    getProfile(userId: number) {
        return instanse.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instanse.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instanse.put<AuthApiType>(`profile/status`, { status: status }).then(res => res.data)
    },
    photoFile(file: any) {
        let formData = new FormData();
        formData.append("image", file);
        return instanse.post<AuthApiType<SavePhotoResponseDataType>>(`profile/photo`, formData,  
        {headers: {
            "Content-Type": "multipart/form-data",
          }}).then(res => res.data)
    },
    profile(profile: ProfileType) {
        return instanse.put<AuthApiType>(`profile`, profile ).then(res => res.data)
    }
}