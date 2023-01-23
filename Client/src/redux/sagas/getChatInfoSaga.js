import {call, put, takeEvery, fork} from "redux-saga/effects"
import {getChatResponse }  from "../reducers/getChatInfo"
import { setMessages } from "../reducers/messages"
import { setCurrentChatID } from "../reducers/chatID"

function* workGetChatFetch({payload}){
    try {
        const contact = payload.contact
        const me = payload.me
        if(!contact.includes("@")){
            const query = yield call(()=> fetch("http://localhost:4000/"+"graphql",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query Messages{messages(id:"${contact}"){messages}}`
                }),
            }))
            const msgData = yield query.json()
            if(msgData.data.messages == null){
                yield put(setMessages([]))
            }else{
                let msg = JSON.parse(msgData.data.messages.messages)    
                yield put(setMessages(msg))
            }
        }else{
            const response = yield call(() =>fetch("http://localhost:4000/"+"graphql", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `query GetChat{getChat(me:"${me}", contact:"${contact}"){msgID}}`
                    }),
            }))
            const data = yield response.json()
            const msgID = data.data.getChat.msgID
            const query = yield call(()=> fetch("http://localhost:4000/"+"graphql",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query Messages{messages(id:"${msgID}"){messages}}`
                }),
            }))
            const msgData = yield query.json()
            if(msgData.data.messages == null){
                yield put(setMessages([]))
            }else{
                let msg = JSON.parse(msgData.data.messages.messages)    
                yield put(setMessages(msg))
            }
            yield put(setCurrentChatID(msgID))
            yield put(getChatResponse(data.data))
        }
        
    } catch (error) {
        throw new Error(error)
    }
}
function* getChat(){
    yield takeEvery("getChat/getChat", workGetChatFetch)
}

export const getChatSagas = [fork(getChat)]