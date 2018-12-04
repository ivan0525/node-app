// @login & register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const passport = require('passport');

const User = require('../../models/User.js');

// $route  GET api/users/test
// @desc 返回请求的json数据
// @access public
// router.get('/test', (req, res) => {
//     res.json({msg: 'login works'});
// });

// $route  POST api/users/register
// @desc 返回请求的json数据
// @access public
router.post('/register', (req, res) => {
    // 查询数据库中邮箱是否有邮箱
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                return res.status(400).json('邮箱已被注册！');
            } else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    identity: req.body.identity,
                    password: req.body.password
                });
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// $route  POST api/users/login
// @desc 返回token jwt passport
// @access public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库，看邮箱信息是否存在
    User.findOne({email})
        .then(user => {
            // 如果用户不存在
            if (!user) {
                return res.status(404).json('用户不存在');
            }
            // 用户存在，进行密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // 密码匹配成功
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        };
                        jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        return res.status(400).json('密码错误');
                    }
                });
        });
});

// $route  POST api/users/current
// @desc return current user
// @access private
// 用 passport 来验证token
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
});
module.exports = router;
