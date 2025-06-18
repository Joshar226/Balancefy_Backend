import { CorsOptions } from "cors";

export const corsConfig : CorsOptions = {
    origin: function(origin, callback) {
        const withelist = [process.env.FRONTEND_URL]

        if(!origin || withelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Cors Error'))
        }
    }
}