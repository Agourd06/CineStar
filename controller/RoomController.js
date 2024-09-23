const roomService = require('../service/RoomService');

const createroom = async(req , res) => {

    try {
        const room = await roomService.createroom(req.body)
        return res.status(201).json({
            message: "room created successfully",
            data : room
        })
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Room already exists'
            });
        }
        res.status(500).json({
            message: 'Failed to create Room',
            error: error.message
        });
    }

}


const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms()

        res.status(200).json({
            success: true,
            data: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



const updateRoom = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const updatedRoom = await roomService.updateRoom(id, req.body);
        if (!updatedRoom) {
            return res.status(404).send("room not found")
        }
        res.status(200).json({
            message: "room updated successfully",
            room: updatedRoom
        })
    } catch (error) {
        console.error("error updating room", error)
        if (error.code = 11000) {
            return res.status(400).json({
                message: "room name already exists"
            })
        }
        res.status(500).json({
            message: "Failed to update room",
            error: error.message
        })
    }
}



const deleteRoom = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const deletedRoom = await roomService.deleteRoom(id);
        if (!deletedRoom) {
            return res.status(404).send("Room not found")
        }
        res.status(200).json({
            message: "Room deleted successfully",
            Room: deletedRoom
        })
    } catch (error) {
        console.error("error deleting Room", error)

        res.status(500).json({
            message: "Failed to delete Room",
            error: error.message
        })
    }
}


module.exports = {
    createroom,
    getAllRooms,
    updateRoom,
    deleteRoom
}