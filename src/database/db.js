// import Realm from "realm";
import { BSON } from "realm";
import { log } from "../config";
import { Messages, Rooms } from "./schemas";

export const getMessagesByRoomId = async (roomId) => {
    const message = await Messages();
    let messageList = message.objects("Messages").filtered(`roomId = '${roomId}'`).sorted("createdAt");
    message.close();
    return messageList;
}

export const writeMessage = async (message, realm) => {
    realm.write(() => {
        realm.create("Messages", {
          _id: new BSON.ObjectID().toHexString(),
          ...message
        });
    });
}

export const listMyRooms = async () => {
    const rooms = await Rooms();
    let roomsList = rooms.objects("Rooms");
    // rooms.close();
    return roomsList;
}

export const storeNewRoom = async (room, realm) => {
    let members = Array.isArray(room.members) ? room.members.join(':') : room.members;
    let creator = JSON.stringify(room.creator);
    let memberDetails = JSON.stringify(room.memberDetails);

    realm.write(() => {
        realm.create("Rooms", {
            ...room,
            _id: String(room._id),
            lastActive: String(room.lastActive),
            createdAt: String(room.createdAt),
            members,
            creator,
            memberDetails,
        });
    });
}