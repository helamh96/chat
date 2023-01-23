import { configureStore }  from "@reduxjs/toolkit"
import createSagaMiddleware from "@redux-saga/core"
import usersReducer from "./reducers/user"
import chatReducer from "./reducers/chat"
import messagesReducer from "./reducers/messages"
import groupChatReducer  from "./reducers/group"
import eventsReducer from "./reducers/events"
import acceptContactReducer from "./reducers/acceptContact"
import createGroupReducer from "./reducers/createGroupChat"
import sendMessageReducer from "./reducers/sendMessage"
import AddToGroupReducer from "./reducers/addToGroup"
import getChatInfoReducer from "./reducers/getChatInfo"
import chatIDReducer from "./reducers/chatID"
import createChannelReducer from "./reducers/createChannel"

import rootSaga from "./sagas/sagaRoot"

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore({
    reducer:{
        user: usersReducer,
        chat: chatReducer,
        chatID: chatIDReducer,
        messages: messagesReducer,
        groupChat: groupChatReducer,
        events: eventsReducer,
        acceptContact: acceptContactReducer, 
        createGroup: createGroupReducer, 
        sendMessage: sendMessageReducer,
        AddToGroup: AddToGroupReducer,
        getChatInfo: getChatInfoReducer,
        createChannel: createChannelReducer
    },
    middleware:[sagaMiddleWare]
})

sagaMiddleWare.run(rootSaga)

export default store