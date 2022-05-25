import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            id: -1,
            username: "",
            email: "",
            admin: false,
            token: ""
        }
    },
    reducers: {
        updateId: (state, action) => {
            state.value.id = action.payload
        },
        updateUsername: (state, action) => {
            state.value.username = action.payload
        },
        updateEmail: (state, action) => {
            state.value.email = action.payload
        },
        updateAdmin: (state, action) => {
            state.value.admin = action.payload
        },
        updateToken: (state, action) => {
            state.value.token = action.payload
        }
    }
})

export async function UpdateData() {
    const dispatch = useDispatch()
    // On récupère le token pour l'envoyer a notre back
    const userToken = useSelector(state => state.user.value.token)
  
    const res = await fetch("http://localhost:8000/api/user/userInfo",{
      headers : {
        authorization: "Bearer " + userToken
      }
    })
    const data = await res.json();
    dispatch(updateId(data.id))
    dispatch(updateUsername(data.username))
    dispatch(updateEmail(data.email))
    dispatch(updateAdmin(data.admin))
}

export const { updateId, updateUsername, updateEmail, updateAdmin, updateToken } = userSlice.actions
export default userSlice.reducer