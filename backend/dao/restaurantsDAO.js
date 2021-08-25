// Initialize database environmental variable
let restaurants

export default class RestaurantsDAO {
    // Connect to restaurants database
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTFINDER_NS).collection("restaurants") 
        } catch (e) {
            console.error(
                `Unable to establish a connection handle in restaurantsDAO: ${e}`, 
            )
        }
    }

    // Query behavior 
    static async getRestaurants({
        filters = null, 
        page = 0, 
        restaurantsPerPage = 20, 
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        // Display results
        let cursor

        try {
            cursor = await restaurants
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`, 
            )
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

}