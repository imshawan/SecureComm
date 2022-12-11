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
        status: "string",
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
    let {defaultPath} = Realm;
    let dbName = defaultPath.substring(defaultPath.lastIndexOf('/') + 1, defaultPath.length);

    return await Realm.open({
        path: defaultPath.replace(dbName, 'messages.realm'),
        schema: [messageSchema],
        schemaVersion: 1,
      });
}

export const Rooms = async () => {
    return await Realm.open({
        schema: [roomSchema],
        schemaVersion: 1,
      });
}