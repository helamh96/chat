import {call, put, takeEvery, fork} from "redux-saga/effects"
import {  addToGroupResponse } from "../reducers/addToGroup"

function* workAddToGroupFetch({payload}){
    try {
        const contactsToAdd = payload.contactsToAdd
        const nameOfGroup = payload.nameOfGroup
        const convID = payload.convID
        const response = yield call(() =>fetch("http://localhost:4000/"+"graphql", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query AddToGroup{addToGroup(contactsToAdd:"${contactsToAdd}", convID:"${convID}", nameOfGroup:"${nameOfGroup}"){response}}`
                }),
        }))
        const data = yield response.json()
        yield put (addToGroupResponse(data.data))
    } catch (error) {
        throw new Error(error)
    }
}
function* addToGroup(){
    yield takeEvery("addToGroup/addToGroup", workAddToGroupFetch)
}

export const addToGroupSagas = [fork(addToGroup)]