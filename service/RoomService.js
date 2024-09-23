const Room = require('../model/RoomModel');


const createroom = async (RoomData) => {
    try {

        const room = new Room.create(RoomData);

        return await room.save()
    } catch (error) {
        throw new Error('room is not added : ' + error.message)

    }
}
module.exports = {
    createroom
}