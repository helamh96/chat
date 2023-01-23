import {call, put, takeEvery, fork} from "redux-saga/effects"
import {  sendMessageResponse } from "../reducers/sendMessage"
import io from 'socket.io-client';


function* workSendMessageFetch({payload}){
    const socket = io("https://localhost:4000");
    try {
        const msg = payload.msg
        const remittent = payload.remittent
        const chatID = payload.chatID
        const isImage = payload.isImage
        const response = yield call(() =>fetch("http://localhost:4000/"+"graphql", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query SendMsg{sendMsg(msg:"${msg}", remittent:"${remittent}", chatID:"${chatID}", isImage:${isImage}){sent}}`
                }),
        }))
        const data = yield response.json()
        socket.emit("sendMsg",{ convID: chatID, remittent:remittent, msg:msg, timestamp: Date.now(), isImage: isImage })
        socket.disconnect()
        yield put (sendMessageResponse(data.data))
    } catch (error) {
        throw new Error(error)
    }
}
function* sendMessage(){
    yield takeEvery("sendMessage/sendMessage", workSendMessageFetch)
}

export const sendMessageSagas = [fork(sendMessage)]