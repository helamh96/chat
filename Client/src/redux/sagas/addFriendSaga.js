import {call, put, takeEvery, fork} from "redux-saga/effects"
import {  addFriendResponse } from "../reducers/events"

function* workAddFriendFetch({payload}){
    try {
        const JWT = payload.JWT
        const contactToAdd = payload.contactToAdd
        const response = yield call(() =>fetch("http://localhost:4000/"+"graphql", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query AddContact{addContact(JWT:"${JWT}", contactToAdd:"${contactToAdd}"){added}}`
                }),
        }))
        const data = yield response.json()
        yield put (addFriendResponse(data.data))
    } catch (error) {
        throw new Error(error)
    }
}
function* addFriend(){
    yield takeEvery("events/addFriend", workAddFriendFetch)
}

export const addFriendSagas = [fork(addFriend)]