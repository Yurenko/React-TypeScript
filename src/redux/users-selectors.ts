import { createSelector } from "reselect";
import { AppReduser } from './redux-store';

export const getUsersSelector = (state: AppReduser) => {
    return state.userPage.users;
}
export const getUser = createSelector(getUsersSelector,
    (users) => {
        return users.filter(u => true);
    })
export const getTotalCount = (state: AppReduser) => {
    return state.userPage.totalCount;
}
export const getPageSize = (state: AppReduser) => {
    return state.userPage.pageSize;
}
export const getCurrentPage = (state: AppReduser) => {
    return state.userPage.currentPage;
}
export const getIsFeatching = (state: AppReduser) => {
    return state.userPage.isFeatching;
}
export const getFollowedIsFeatching = (state: AppReduser) => {
    return state.userPage.followedIsFeatching;
}
export const getPortionSize = (state: AppReduser) => {
    return state.userPage.portionSize;
}
export const getSearchForm = (state: AppReduser) => {
    return state.userPage.filter
}