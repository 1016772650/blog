/**
 * Created by vijay on 2018/2/11.
 */

module.exports = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || (process.env.NODE_ENV == "production" ? 8080:4000),
    apiHost: process.env.APIHOST || '127.0.0.1',
    apiPort: process.APIPORT || '4030',
    dbHOST: "localhost",
    dbPort: "27017",
    app: {
        title: "personal blog",
        description: 'personal blog demo',
        head: {
            titleTemplate: 'blog',
            meta: [
                {
                    name: "description",
                    content: "react express demo"
                },
                { charset: "utf-8" }
            ]
        }
    }
};