import { createSlice } from '@reduxjs/toolkit'
import userServices from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: { message: {}, users: [] },
  reducers: {
    getAll(state, action) {
      state.users = action.payload
    },
  },
})

const getAll = () => {
  return async (dispatch) => {
    const users = await userServices.getAll()
    dispatch(userSlice.actions.getAll(users))
  }
}

export { getAll }
export default userSlice.reducer
