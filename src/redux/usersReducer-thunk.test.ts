import { UserAPI } from "../api/user-api"
import { DefaultResponseType } from "../types/types"
import { actions, follow, unfollow } from "./usersReducer"

jest.mock("../api/user-api")

const result: DefaultResponseType = {
  data: {},
  messages: [],
  resultCode: 0,
}
const UserAPIMock = UserAPI as jest.Mocked<typeof UserAPI>
let dispatchMock = jest.fn()
let getStateMock = jest.fn()

beforeAll(() => {
  dispatchMock = jest.fn()
  getStateMock = jest.fn()
})


test('follow thunk test',async () => {
  UserAPIMock.subscribeUsers.mockReturnValue(Promise.resolve(result))
  const thunkMock = follow(1)
  
  await thunkMock(dispatchMock, getStateMock,{})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccesec(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 1))
})

test('unfollow thunk test', async () => {
  UserAPIMock.deleteUsers.mockReturnValue(Promise.resolve(result))
  const thunkMock = unfollow(1)

  await thunkMock(dispatchMock, getStateMock,{})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccesec(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 1))
}) 