import { all } from "redux-saga/effects";
import { addFriendSagas } from "./addFriendSaga";
import { acceptContactSagas } from "./acceptContactSagas";
import { createGroupSagas } from "./createGroupSaga";
import { sendMessageSagas } from "./sendMessageSaga";
import { addToGroupSagas } from "./addToGroupSaga";
import { getChatSagas } from "./getChatInfoSaga";
import { channelSagas } from "./channelSagas";

export default function* rootSaga(){
    yield all([...addFriendSagas,
         ...acceptContactSagas,
         ...createGroupSagas,
         ...sendMessageSagas,
         ...addToGroupSagas,
         ...getChatSagas,
         ...channelSagas
        ])
}