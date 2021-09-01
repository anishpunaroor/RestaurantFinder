import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews

export default class ReviewsDAO {
    // Access review collection using database
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db(process.env.RESTFINDER_NS).collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    // Add a review to the collection, store in databaseA
    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = { 
                name: user.name, 
                user_id: user._id, 
                date: date, 
                text: review,
                restaurant_id: ObjectId(restaurantId), 
            }
            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId)}, 
                { $set: { text: text, date: date } }, 
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }
}