// import Realm from "realm";
import { log } from "../config";
import { Messages, Rooms } from "./schemas";

export const getMessagesByRoomId = async (roomId) => {
    const message = await Messages();
    let messageList = message.objects("Messages").filtered(`roomId = '${roomId}'`).sorted("createdAt");
    // message.close();
    return messageList;
}

export const writeMessage = async (message) => {
    const realmObject = await Messages();

    realmObject.write(() => {
        realmObject.create("Messages", {...message, roomId: message.room});
    });

    // realmObject.close();
}

export const listMyRooms = async () => {
    const rooms = await Rooms();
    let roomsList = rooms.objects("Rooms");
    // rooms.close();
    return roomsList;
}

export const storeNewRoom = async (room, realm) => {
    let _id = String(room._id);
    let members = Array.isArray(room.members) ? room.members.join(':') : room.members;
    let creator = JSON.stringify(room.creator);
    let {memberDetails} = room;

    memberDetails = typeof memberDetails === 'object' ? JSON.stringify(memberDetails) : memberDetails;

    let document = realm.objects("Rooms").filtered(`_id = '${_id}'`);
    
    if (!document || !document.length) {
        realm.write(() => {
        
            realm.create("Rooms", {
                ...room,
                _id,
                lastActive: String(room.lastActive),
                createdAt: String(room.createdAt),
                members,
                creator,
                memberDetails,
            });
        });
    }
}

export const updateRoomData = async (data={}, id) => {
    if (!data || !Object.keys(data).length) {
        return;
    }

    const realmObj = await Rooms();
    id = parseInt(id);

    let document = realmObj.objects("Rooms").filtered(`roomId = '${id}'`);
    if (document && document.length) {

        realmObj.write(() => {
            Object.keys(data).forEach((elem) => {
                document[0][elem] = data[elem];
            });
        });
    }
}

export const clearCurrentRooms = async () => {
    const rooms = await Rooms();
    rooms.write(() => {
        let roomsObj = rooms.objects("Rooms");
        rooms.delete(roomsObj);
    });
}

export const clearAllMessages = async () => {
    const messages = await Messages();
    messages.write(() => {
        let messagesObj = messages.objects("Messages");
        messages.delete(messagesObj);
    });
}