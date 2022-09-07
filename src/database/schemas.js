import Realm from "realm";

const messageSchema = {
    name: "Messages",
    properties: {
        id: "string",
        _id: "string",
        name: "string",
        message: "string",
        roomId: "int",
        createdAt: "string",
    }
};

export const roomSchema = {
    name: "Rooms",
    properties: {
        _id: "string",
        members: "string",
        roomId: "int",
        creator: "string",
        lastActive: "string",
        createdAt: "string",
        name: "string",
        memberDetails: "string",
        latestMessage: "string?",
        unreadMessageCount: "int?",
    }
}

export const Messages = async () => {
    return await Realm.open({
        schema: [messageSchema],
      });
}

export const Rooms = async () => {
    return await Realm.open({
        schema: [roomSchema],
        schemaVersion: 1,
      });
}