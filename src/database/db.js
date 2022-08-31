// import Realm from "realm";
import { BSON } from "realm";
import { Message } from "./schemas";

export const getMessagesByRoomId = async (roomId) => {
    const message = await Message();
    let messages = message.objects("Messages").filtered(`roomId = '${roomId}'`).sorted("createdAt");
    message.close();
    return messages;
}

export const writeMessage = async (message, realm) => {
    realm.write(() => {
        task1 = realm.create("Messages", {
          _id: new BSON.ObjectID(),
          ...message
        });
    });
}