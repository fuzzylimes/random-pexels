const https = require('https');
const HOST = "api.pexels.com";
const API_KEY = process.env.API_KEY;

module.exports = (req, res) => {
    const {count = 1} = req.query;
    if (count > 80) {
        res.status(400).send("Invalid query parameter; max count value of 80.")
    }
    const randomPage = Math.floor(Math.random() * (8000 / count));
    const randomReq = https.request({
        hostname: HOST,
        port: 443,
        method: 'GET',
        path: `/v1/curated?per_page=${count}&page=${randomPage}`,
        timeout: 2000,
        headers: {
            Authorization: API_KEY
        }
    }, resp => {
        let data = '';
        resp.on("data", d => {
            data += d;
        })
        resp.on('end', () => {
            let payload = JSON.parse(data).photos;
            payload = payload.map(p => {
                return {
                    id: p.id,
                    width: p.width,
                    height: p.height,
                    url: p.url,
                    photographer: p.photographer,
                    photographer_url: p.photographer_url,
                    avg_color: p.avg_color,
                    src: p.src
                }
            })
            res.status(200).send({ photos: payload });
        })
    }).on("error", err => {
        console.error(err);
        res.status(500).send();
    });
    randomReq.end();
}