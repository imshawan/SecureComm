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

export const updateRoomData = async (data, id) => {
    const realmObj = await Rooms();
    id = String(id);

    let document = realmObj.objects("Rooms").filtered(`_id = '${id}'`);
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