const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// HTMLを表示するための設定
app.use(express.static(path.join(__dirname, 'public')));

// プロキシの仕組み
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.send('URLを入力してください');

    try {
        // サーバーが代わりにサイトを読み込む
        const response = await axios.get(targetUrl, { responseType: 'text' });
        res.send(response.data);
    } catch (error) {
        res.send('サイトを開けませんでした：' + error.message);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
