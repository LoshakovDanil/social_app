import { actions, InitialStateType, usersReducer } from './usersReducer'

let state: InitialStateType
beforeAll(() => {
  state = {
    users: [
      { id: 0, name: 'Dima', photos: { small: null, large: null }, followed: false, status: 'status 1' },
      { id: 1, name: 'Stas', photos: { small: null, large: null }, followed: false, status: 'status 2' },
      { id: 2, name: 'Gena', photos: { small: null, large: null }, followed: true, status: 'status 3' },
      { id: 3, name: 'Vlad', photos: { small: null, large: null }, followed: true, status: 'status 4' },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowing: [],
    filter: {
      term: '',
      friend: null as boolean | null | string,
    },
  }
})

test('sucess follow test', () => {
  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test('sucess unfollow test', () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})
