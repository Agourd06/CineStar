const Room = require('../model/RoomModel');




const createroom = async (RoomData) => {
    try {

        const room = new Room(RoomData);

        return await room.save()
    } catch (error) {
        throw new Error('room is not added : ' + error.message)

    }
}





const getAllRooms = async () => {
    try {
        const rooms = await Room.find({
            deleted_at: null
        });

        return rooms;
    } catch (error) {
        throw new Error('Error fetching rooms: ' + error.message);
    }
}

const getRoom = async (roomId) => {


    try {
        const room = await Room.findOne({
            _id: roomId,
            deleted_at: null
        });
        return room;
    } catch (error) {
        throw new Error('Error fetching Room: ' + error.message);
    }
}




const updateRoom = async (roomId, roomData) => {
    try {
        const updatedRoom = await Room.findOneAndUpdate({
                _id: roomId
            },
            roomData, {
                new: true
            });
        return updatedRoom
    } catch (error) {
        throw new Error('Error updating room: ' + error.message);
    }
}




const deleteRoom = async (roomId) => {
    try {
        const deletedRoom = await Room.findOneAndUpdate({
            _id: roomId
        }, {
            deleted_at: new Date()
        }, {
            new: true
        });
        return deletedRoom
    } catch (error) {
        throw new Error('Error updating Room: ' + error.message);
    }
}



module.exports = {
    createroom,
    getAllRooms,
    getRoom,
    updateRoom,
    deleteRoom
}