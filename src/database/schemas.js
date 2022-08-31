import Realm from "realm";

const messageSchema = {
    name: "Messages",
    properties: {
        _id: "objectId",
        content: "string",
        sender: "string",
        roomId: "int",
        createdAt: "string",
    },
    primaryKey: "_id",
};

const roomSchema = {
    name: "Rooms",
    properties: {
        _id: "objectId",
        members: "array",
        roomId: "int",
        creator: "string"
    },
    primaryKey: "_id",
}

export const Messages = async () => {
    return await Realm.open({
        schema: [messageSchema],
      });
}

export const Rooms = async () => {
    return await Realm.open({
        schema: [roomSchema],
      });
}