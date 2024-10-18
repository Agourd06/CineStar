const {
    Client
} = require('minio');
const commentService = require('../service/CommentsService');
const {
    commentSchema
} = require('../validations/commentValidation');


const createComment = async (req, res) => {

    try {
        const {
            error
        } = commentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const comment = await commentService.createComment(req.body)

        const newComment = {
            client: {
                name: req.user.name,
                _id: req.user._id
            },
            content: comment.content,
            createdAt: comment.createdAt,
            deleted_at: null,
            movie: comment.movie,
            updatedAt: comment.updatedAt,
            
            _id: comment._id,
        }
        return res.status(201).json({
            message: "comment created SuccessFully",
            comment: newComment
            // client: req.user
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Failed to create comment',
            error: error.message
        });
    }
}
const getMovieComments = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            page = 1, limit = 20
        } = req.query;

        const comments = await commentService.getMovieComments(id, Number(page), Number(limit));
        const commentsCount = await commentService.countMovies(id);
        if (!comments) {
            return res.status(400).send('Comments not found');
        }

        return res.status(200).json({
            comments: comments,
            commentsCount: commentsCount
        });
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        return res.status(500).send('Error fetching comments: ' + error.message);
    }
}



const deleteComment = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const deletedComment = await commentService.deleteComment(id);
        if (!deletedComment) {
            return res.status(404).send("Comment not found")
        }
        res.status(200).json({
            message: "Comment deleted successfully",
            Comment: deletedComment
        })
    } catch (error) {
        console.error("error deleting Comment", error)

        res.status(500).json({
            message: "Failed to delete Comment",
            error: error.message
        })
    }
}
module.exports = {
    createComment,
    getMovieComments,
    deleteComment
}