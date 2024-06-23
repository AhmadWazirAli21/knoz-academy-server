const Review = require('../Models/review');

exports.addReview = async (req, res) => {
    const {review_content} = req.body
    const {user_id} = req.params
    try {
        const review = await Review.create({
            user_id,
            review_content
        })
        return res.status(200).json({msg : 'review added'})
    } catch (error) {
        res.status(500).json(error)
    }
}