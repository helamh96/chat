import {call, put, takeEvery, fork} from "redux-saga/effects"
import {  acceptContactResponse } from "../reducers/acceptContact"

function* workAcceptContactFetch({payload}){
    try {
        const JWT = payload.JWT
        const contactToAccept = payload.contactToAccept
        const response = yield call(() =>fetch("http://localhost:4000/"+"graphql", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query ConfirmContact{confirmContact(JWT:"${JWT}", contactToAccept:"${contactToAccept}"){confirmed}}`
                }),
        }))
        const data = yield response.json()
        yield put (acceptContactResponse(data.data))
    } catch (error) {
        throw new Error(error)
    }
}
function* acceptContact(){
    yield takeEvery("acceptContact/acceptContact", workAcceptContactFetch)
}

export const acceptContactSagas = [fork(acceptContact)]