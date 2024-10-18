const ClientService = require('../service/ClientService');
const {
    UserId
} = require('../helpers/helpers');
const getClient = async (req, res) => {

    try {
        let userId = UserId(req)

        const user = await ClientService.getClient(userId)
        if (!user) {
            return res.status(404).send("User Not found")
        }

        res.status(200).json({
            successes: true,
            user: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
const subscribe = async (req, res) => {
    try {
        const userId = UserId(req);
        const subscribed = await ClientService.subscribe(userId);

        if (!subscribed) {
            return res.status(404).json({
                message: "Client not found"
            });
        }



        res.status(200).json({
            message: "Client subscribed successfully",
            client: subscribed
        });
    } catch (error) {
        console.error("Error subscribing client", error);
        res.status(500).json({
            message: "Failed to subscribe client",
            error: error.message
        });
    }
};
const manageFavoritMovie = async (req, res) => {
    try {
        const userId = UserId(req); // Fetch the userId from the request (Assuming `UserId` is a utility to get the ID)
        const {
            movieId
        } = req.params;

        console.log({
            user: userId
        }, {
            movie: movieId
        });

        const favorit = await ClientService.manageFavoritMovie(userId, movieId);
        const isFavorite = favorit !== null;

        res.status(200).json({
            message: `Favorit is ${isFavorite ? 'added' : 'removed'} successfully`,
            isFavorite,
            favorit: favorit
        });
    } catch (error) {
        console.error("Error managing favorite:", error);
        res.status(500).json({
            message: "Failed to manage favorite",
            error: error.message
        });
    }
};

const isFavorite = async (req, res) => {
    try {
        const userId = UserId(req);
        const {
            movieId
        } = req.params;

        console.log({
            user: userId
        }, {
            movie: movieId
        });

        const isFavorite = await ClientService.isFavorit(userId, movieId);

        res.status(200).json({
            message: isFavorite ? 'Movie is a favorite' : 'Movie is not a favorite',
            isFavorite: isFavorite
        });
    } catch (error) {
        console.error("Error checking favorite status:", error);
        res.status(500).json({
            message: "Failed to check favorite status",
            error: error.message
        });
    }
};

const FavoritMovie = async (req, res) => {
    try {
        let userId = UserId(req)

        const favorites = await ClientService.FavoritMovie(userId)

        res.status(200).json({
            success: true,
            data: favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
const RatingMovie = async (req, res) => {
    const {
        rate
    } = req.body;
    let userId = UserId(req)
    const {
        movieId
    } = req.params;

    try {
        const createdRate = await ClientService.ratingMovie(userId, movieId, rate);
        return res.status(201).json({
            success: true,
            message: 'Rating added successfully!',
            data: createdRate,
        });
    } catch (error) {
        console.error("Error in RatingController:", error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add rating.',
            error: error.message,
        });
    }
}
const getClientRating = async (req, res) => {
    let userId = UserId(req)
    const { movieId } = req.params; 

    try {
        const rating = await ClientService.getClientRating(userId, movieId);
        
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        return res.status(200).json(rating);
    } catch (error) {
        console.error("Error in fetching user rating:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    getClient,
    subscribe,
    manageFavoritMovie,
    FavoritMovie,
    isFavorite,
    RatingMovie,
    getClientRating
};