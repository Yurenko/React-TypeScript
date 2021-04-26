import { actions } from './users-reduser';
import usersReduser, { InitialStateType } from "./users-reduser";

let state: InitialStateType = {
    users: [{ id: 0, name: 'User 0', status: 'ok', followed: false, photos: { small: null, large: null } },
    { id: 1, name: 'User 1', status: 'ok', followed: false, photos: { small: null, large: null } },
    { id: 2, name: 'User 2', status: 'ok', followed: true, photos: { small: null, large: null } },
    { id: 3, name: 'User 3', status: 'ok', followed: true, photos: { small: null, large: null } },{ id: 0, name: 'User 0', status: 'ok', followed: false, photos: { small: null, large: null } }
    ],
    totalCount: 0,
    pageSize: 25,
    currentPage: 1,
    isFeatching: false,
    followedIsFeatching: [],
    portionSize: 10
}
test('', () => {
  const newState = usersReduser(state, actions.acceptFollow(1))
  expect(newState.users[0].followed).toBeFalsy
  expect(newState.users[2].followed).toBeTruthy
})