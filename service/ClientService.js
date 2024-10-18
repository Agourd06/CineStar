const User = require('../model/UserModel');
const Favorit = require('../model/FavoritModel');
const Rating = require('../model/RatingModel');


const getClient = async (clientId) => {
  try {
    const client = await User.findOne({
      role: 'client',
      _id: clientId,
      deleted_at: null
    });
    return client;
  } catch (error) {
    throw new Error('Error fetching Client: ' + error.message);
  }
};

const subscribe = async (userId) => {
  try {
    const updatedClient = await User.findOneAndUpdate({
      _id: userId
    }, {
      subscribed: true
    }, {
      new: true
    });

    if (!updatedClient) {
      throw new Error('Client not found');
    }

    return updatedClient;
  } catch (error) {
    throw new Error('Error updating subscribe: ' + error.message);
  }
};

const manageFavoritMovie = async (userId, movieId) => {
  try {
      const favorit = await Favorit.findOne({
          client: userId,
          movie: movieId,
      });

      if (favorit) {
          await Favorit.deleteOne({ client: userId, movie: movieId });
          return null;
      } else {
          const createdFavorit = await new Favorit({ client: userId, movie: movieId }).save();
          return createdFavorit;
      }
  } catch (error) {
      console.error("Error in managing favorite:", error);
      throw error;
  }
};

const isFavorit = async (userId, movieId) => {
  try {
      const favorit = await Favorit.findOne({
          client: userId,
          movie: movieId,
      });

      return favorit !== null;  
  } catch (error) {
      console.error("Error in checking favorite movie:", error);
      throw error;
  }
};



  const FavoritMovie = async (userId) => {
    try {
      const favorits = await Favorit.find({
        client: userId,
      }) .populate('movie', 'name _id image duration description')


      return favorits

    } catch (error) {
      console.error("Error in Favorit Movie:", error);
      throw error;
    }
  };

  const ratingMovie = async (userId, movieId, rate) => {
    try {
        const existingRating = await Rating.findOne({ client: userId, movie: movieId });

        if (existingRating) {
            existingRating.rate = rate;
            const updatedRate = await existingRating.save();
            return updatedRate;
        } else {
            const createdRate = await new Rating({ client: userId, movie: movieId, rate }).save();
            return createdRate;
        }
    } catch (error) {
        console.error("Error in adding/updating rate:", error);
        throw error;
    }
};
const getClientRating = async (userId, movieId) => {
  try {
      const rating = await Rating.findOne({ client: userId, movie: movieId });
      return rating; 
  } catch (error) {
      console.error("Error fetching user rating:", error);
      throw error; 
  }
};




module.exports = {
  getClient,
  subscribe,
  manageFavoritMovie,
  FavoritMovie,
  isFavorit,
  ratingMovie,
  getClientRating
};