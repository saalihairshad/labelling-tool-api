const express = require('express');
const { User, validate } = require('../models/user');

const _ = require('lodash');
const bcrypt = require('bcrypt');


const router = express.Router();


router.post('/', async (req, res) => {

    //validate data
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if email already taken
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already register.');

    //Save to database (Pick only required attributes from req.body)
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router;