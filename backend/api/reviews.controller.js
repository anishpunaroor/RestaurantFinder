import ReviewsDAO from "../dao/reviewsDAO.js"

// Allow users to post reviews of restaurants to the website
export default class ReviewsController {
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
}