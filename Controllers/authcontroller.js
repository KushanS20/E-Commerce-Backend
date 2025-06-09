const db = require("../Config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    const { name,email,password,sex,mobile,address,postal_code} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const [existing] = await db.query("SELECT * FROM user WHERE email=?",[email]);
        if(existing.length > 0){
            return res.status(400).json({error:"Email already exists"});
        }
        await db.query("INSERT INTO user (name,email,password,sex,mobile,address,postal_code) VALUES (?,?,?,?,?,?,?)",
            [name,email,hashedPassword,sex,mobile,address,postal_code]);
        res.json({message:"User Successfully registered"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.login = async (req, res) => {
    const { email,password } = req.body;
    try {
        const [users] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
        if (users.length === 0) return res.status(400).json({error: "User not found"});

        const user = users[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({error: "Invalid password"});

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({token});
    }catch(err) {
        res.status(500).json({message: err.message});
    }
}

exports.profile = async (req, res) => {
    try{
        const [users] = await db.query("SELECT * FROM user WHERE id = ?",[req.user.id]);
        if (users.length === 0) return res.status(404).json({error: "User not found"});

        const user = users[0];
        delete user.password;
        res.json({user});
    }catch(err) {
        res.status(500).json({message: err.message});
    }
};
