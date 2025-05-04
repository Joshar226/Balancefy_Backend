import { CorsOptions } from "cors";

export const corsConfig : CorsOptions = {
    origin: function(origin, callback) {
        const withelist = [process.env.FRONTEND_URL]

        if(process.argv[2] === '--api') {
            withelist.push(undefined)
        }
        if(withelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Cors Error'))
        }
    }
}