import {call, fork, put, take, takeLatest} from 'redux-saga/effects'
import {eventChannel, END} from 'redux-saga';
import {addMessage} from "../reducers/messages"
import io from 'socket.io-client';

function createSocketConnection() {
    const userID = arguments[0].userID
    const convID = arguments[1].convID
    const socket = io("http://localhost:4000");
    socket.emit("newUser", {userID:userID, convID: convID})
    return socket;
}


function createSocketChannel(socket) {
    const channel = eventChannel((emit) => {

        const errorHandler = (error) => {
            emit(new Error(error.reason))
        }

        function msgHandler(args){
            emit(args)
        }

        socket.on('getMsg', msgHandler);
        socket.on("error", errorHandler)

        return () => {emit(END)}
    });

    return channel
}

function* watchSocketChannel({payload}) {
    const userID = payload.me
    let convID = payload.contact
    if(convID.includes("@")){
        const response = yield call(() =>fetch("http://localhost:4000/"+"graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query GetChat{getChat(me:"${userID}", contact:"${convID}"){msgID}}`
            }),
        }))
        const data = yield response.json()
        convID = data.data.getChat.msgID
    }
    const socket = yield call(createSocketConnection, {userID}, {convID});
    const socketChannel = yield call(createSocketChannel, socket);
    while (true) {
        try {
            const payload = yield take(socketChannel);
            yield put(addMessage(payload))
        } catch (err) {
            console.log('socket error: ', err);
        }
    }
}

function* channel(){
    yield takeLatest("createChannel/createChannel", watchSocketChannel)
}

export const channelSagas = [fork(channel)];