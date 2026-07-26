const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   STATIC FILES
========================= */

app.use(express.static(__dirname));

/* =========================
   PROPS API
========================= */

app.get('/api/props', (req, res) => {

    const propsPath = path.join(__dirname, 'projects', 'Props');
    const folders = fs.readdirSync(propsPath);

    const data = folders.map(folder => {

        const folderPath = path.join(propsPath, folder);
        const files = fs.readdirSync(folderPath);

        let image = files.find(file =>
            /^Render_1\.(jpg|jpeg|png|webp)$/i.test(file)
        );

        if (!image) {
            image = files.find(file =>
                /\.(jpg|jpeg|png|webp)$/i.test(file)
            );
        }

        return {
            title: folder,
            image: `/projects/Props/${folder}/${image}`
        };

    });

    res.json(data);

});

/* =========================
   PROPS GALLERY API
========================= */

app.get('/api/gallery/:folder', (req, res) => {

    const folder = req.params.folder;

    const folderPath = path.join(
        __dirname,
        'projects',
        'Props',
        folder
    );

    const files = fs.readdirSync(folderPath);

    const images = files
        .filter(file =>
            /\.(jpg|jpeg|png|webp)$/i.test(file)
        )
        .sort()
        .map(file =>
            `/projects/Props/${folder}/${file}`
        );

    res.json(images);

});

/* =========================
   ENVIRONMENT API
========================= */

app.get('/api/environment', (req, res) => {

    const envPath = path.join(
        __dirname,
        'projects',
        'Environment'
    );

    const folders = fs.readdirSync(envPath);

    const data = folders.map(folder => {

        const folderPath = path.join(envPath, folder);
        const files = fs.readdirSync(folderPath);

        let image = files.find(file =>
            /^Render_1\.(jpg|jpeg|png|webp)$/i.test(file)
        );

        if (!image) {
            image = files.find(file =>
                /\.(jpg|jpeg|png|webp)$/i.test(file)
            );
        }

        return {
            title: folder,
            image: `/projects/Environment/${folder}/${image}`
        };

    });

    res.json(data);

});

/* =========================
   ENVIRONMENT GALLERY API
========================= */

app.get('/api/environment-gallery/:folder', (req, res) => {

    const folder = req.params.folder;

    const folderPath = path.join(
        __dirname,
        'projects',
        'Environment',
        folder
    );

    const files = fs.readdirSync(folderPath);

    const images = files
        .filter(file =>
            /\.(jpg|jpeg|png|webp)$/i.test(file)
        )
        .sort()
        .map(file =>
            `/projects/Environment/${folder}/${file}`
        );

    res.json(images);

});

/* =========================
   SCRIPTS API
========================= */

app.get('/api/scripts', (req, res) => {

    const data = [

        {
            title: "Maya Tools",
            thumbnail: "https://img.youtube.com/vi/jzryZaddN7s/maxresdefault.jpg",
            youtube: "https://youtu.be/jzryZaddN7s"
        }

    ];

    res.json(data);

});

/* =========================
   CREDITS API
========================= */

app.get('/api/credits', (req, res) => {

    const creditsPath = path.join(
        __dirname,
        'projects',
        'Credits'
    );

    if (!fs.existsSync(creditsPath)) {
        return res.json([]);
    }

    const files = fs.readdirSync(creditsPath);

    const data = files
        .filter(file =>
            /\.(jpg|jpeg|png|webp)$/i.test(file)
        )
        .sort()
        .map(file => ({

            title: path.parse(file).name,

            image: `/projects/Credits/${file}`

        }));

    res.json(data);

});

/* =========================
   CREDITS GALLERY API
========================= */

app.get('/api/credits-gallery', (req, res) => {

    const creditsPath = path.join(
        __dirname,
        'projects',
        'Credits'
    );

    if (!fs.existsSync(creditsPath)) {
        return res.json([]);
    }

    const files = fs.readdirSync(creditsPath);

    const images = files
        .filter(file =>
            /\.(jpg|jpeg|png|webp)$/i.test(file)
        )
        .sort()
        .map(file =>
            `/projects/Credits/${file}`
        );

    res.json(images);

});

/* =========================
   SERVER START
========================= */

app.listen(PORT, () => {

    console.log(`
🔥 SERVER RUNNING
http://localhost:${PORT}
`);

});