import {call, put, takeEvery, fork} from "redux-saga/effects"
import { createGroupResponse } from "../reducers/createGroupChat"

function* workCreateGroupFetch({payload}){
    try {
        const JWT = payload.JWT
        const me = payload.me
        const nameOfGroup = payload.nameOfGroup
        const contacts = payload.contacts
        const response = yield call(() =>fetch("http://localhost:4000/"+"graphql", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query CreateGroup{createGroup(me:"${me}", contacts:"${contacts}", JWT:"${JWT}", nameOfGroup:"${nameOfGroup}"){isCreated}}`
                }),
        }))
        const data = yield response.json()
        yield put (createGroupResponse(data.data))
    } catch (error) {
        throw new Error(error)
    }
}
function* createGroup(){
    yield takeEvery("createGroup/createGroup", workCreateGroupFetch)
}

export const createGroupSagas = [fork(createGroup)]