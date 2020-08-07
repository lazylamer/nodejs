const http = require('http');
const fs = require('fs');
const path = require('path');

const loadPage = (res, page) => {
    fs.readFile(
        path.join(__dirname, 'views', page),
        'utf-8',
        (err, content) => {
            if (err) throw err;
            res.end(content);
        }
    )
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})

        switch (req.url) {
            case '/':
                loadPage(res, 'index.html');
                break;
            case '/about':
                loadPage(res, 'about.html');
                break;
            case '/api/users':
                res.writeHead(200, {'Content-Type': 'text/json'})

                const users = [
                    {name: 'svetlana', age: 22},
                    {name: 'vlakas', age: 69}
                ]


                res.end(JSON.stringify(users))
                break;
        }

    } else if (req.method === 'POST') {
        const body = [];
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})

        req.on('data', data => {
            body.push(Buffer.from(data));
        })

        req.on('end', () => {
            const message = body.toString().split('=')[1];
            console.log(message);

            res.end(`
            <h1>Your message has been sent: ${message}</h1>
            <h1>ваше ссааабщениывеыф</h1>
        `)
        })
    }
});

server.listen(3000, () => {
    console.log('server is running...');
})