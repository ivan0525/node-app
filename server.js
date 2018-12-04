const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // 中间件，对post请求体进行解析
const passport = require('passport');
const app = express();

// 引入 user.js
const users = require('./routes/api/users.js');

// 引入 profile.js
const profile = require('./routes/api/profile.js');

// DB config
const db = require('./config/keys.js').mongoURI;

// 使用body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(db)
    .then(() => {
        // success to connect
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        // fail to connect
        console.log(err);
    });

// passport 初始化
app.use(passport.initialize());

require('./config/passport.js')(passport);

app.get('/', (req, res) => {
    res.send('Hello World! 你好世界hehe');
});

// 使用路由
app.use('/api/users', users);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
