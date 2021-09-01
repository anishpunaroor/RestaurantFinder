import ReviewsDAO from "../dao/reviewsDAO.js"


export default class ReviewsController {
    // Allow users to post reviews of restaurants
    static async apiPostReview(req, res, next) {
        try {
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name, 
                _id: req.body.user_id
            }
            const date = new Date()

            const Review Response = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            )
            res.json({status: "success" })
        } catch (e){
            res.status(500).json({ error: e.message })
        }
    }
    
    // Users can update their own reviews 
    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text 
            const date = new Date() 

            const review Response = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text, 
                date,
            )
            
            var { error } = reviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (reviewsResponse.modifiedCount === 0) {
                throw new Error(
                    "Unable to update review, user may not be the original poster."
                )
            }

            res.json({ status: "success" })   
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}