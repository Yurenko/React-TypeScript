import { AuthApiType, AuthApiEnum } from './../api/api';
import { follow, actions } from './users-reduser';
import { usersAPI } from "../api/usersApi";
jest.mock("../api/usersApi")

let userAPIMock = usersAPI
const result: AuthApiType = {
    resultCode: AuthApiEnum.Success,
    messages: [],
    data: {}
}
// @ts-ignore
userAPIMock.follow.mockReturnValue(result)
test('', async () => {
    const thunk = follow(1);
    const dispatchMock = jest.fn();
    // @ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowedIsFeatching(true, 1))
})