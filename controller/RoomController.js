const roomService = require('../service/RoomService');
const reservationService = require('../service/ReservationService');
const sessionService = require('../service/SessionService');
const {
    createRoomSchema,
    updateRoomSchema
} = require('../validations/RoomValidations')
const createroom = async (req, res) => {

    try {


        const {
            error
        } = createRoomSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const room = await roomService.createroom(req.body)
        return res.status(201).json({
            message: "room created successfully",
            room: room
        })
    } catch (error) {
        console.error(error);
     
        res.status(500).json({
            message: 'Failed to create Room',
            error: error.message
        });
    }

}


const getAllRooms = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;

        const rooms = await roomService.getAllRooms(Number(page), Number(limit))

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



const getRoom = async (req, res) => {
    try {

        const {
            id
        } = req.params

        const room = await roomService.getRoom(id);

        res.status(200).json({
            data: room,
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

        const {
            error
        } = updateRoomSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
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
    getRoom,
    updateRoom,
    deleteRoom
}