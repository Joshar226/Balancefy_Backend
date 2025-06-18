import server from "./server";

const port = process.env.PORT
const host = process.env.HOST


server.listen(+port, host, () => {
    console.log(`REST API working in ${host}:${port}`);
})