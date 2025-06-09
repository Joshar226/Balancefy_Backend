import server from "./server";

const port = process.env.PORT || 4000
const host = process.env.HOST || '192.168.0.13'


server.listen(+port, host, () => {
    console.log(`REST API working in ${host}:${port}`);
})