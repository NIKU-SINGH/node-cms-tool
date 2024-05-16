import User from '../models/user.js';

const getUsers = async (req, res) => {
    // try {
    //     const users = await User.findAll();
    //     res.send(users);
    // } catch (err) {
    //     console.log(err);
    //     res.sendStatus(500);
    // }
    console.log("thiis user",User)
    res.send("hello")
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.create({ name, email, password });
        res.status(200).send({ message: "Successfully added user" });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export { getUsers, createUser };