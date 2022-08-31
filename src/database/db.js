// import Realm from "realm";
import { BSON } from "realm";
import { Messages, Rooms } from "./schemas";

export const getMessagesByRoomId = async (roomId) => {
    const message = await Messages();
    let messageList = message.objects("Messages").filtered(`roomId = '${roomId}'`).sorted("createdAt");
    message.close();
    return messageList;
}

export const writeMessage = async (message, realm) => {
    realm.write(() => {
        task1 = realm.create("Messages", {
          _id: new BSON.ObjectID(),
          ...message
        });
    });
}

export const listMyRooms = async () => {
    const rooms = await Rooms();
    let roomsList = rooms.objects("Rooms").sorted("lastActive");
    rooms.close();
    return roomsList;
}

export const storeNewRoom = async () => {}