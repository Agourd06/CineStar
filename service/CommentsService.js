const Comment = require('../model/CommentModel')

const createComment = async (commentData) => {
    try {

        const comment = new Comment(commentData)
        return await comment.save()
    } catch (error) {
        throw new Error("comment not added", error.message);

    }
}
const getMovieComments = async (movieId, page = 1, limit = 20) => {
    try {
        const skip = (page - 1) * limit;
        const comments = await Comment.find({
                movie: movieId,
                deleted_at: null
            })
            .populate('client', 'name')
            .skip(skip)
            .sort({
                createdAt: -1
            })
            .limit(limit);

        return comments;
    } catch (error) {
        throw new Error('Error fetching comments: ' + error.message);
    }
}
const countMovies = async (movieId) => {
    try {
        const commentsCount = await Comment.countDocuments({
            movie: movieId,
            deleted_at: null
        });


        return commentsCount;
    } catch (error) {
        throw new Error('Error fetching comments: ' + error.message);
    }
}

const deleteComment = async (commentId) => {
    try {
        const deletedComment = await Comment.findOneAndUpdate({
            _id: commentId
        }, {
            deleted_at: new Date()
        }, {
            new: true
        });
        return deletedComment
    } catch (error) {
        throw new Error('Error updating comment: ' + error.message);
    }
}


module.exports = {
    createComment,
    getMovieComments,
    deleteComment,
    countMovies
}