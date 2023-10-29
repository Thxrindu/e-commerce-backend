const router = require('express').Router();
const db = require('../../models/index');
const User = require('../../models/User')(db.sequelize);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../middlewares/authentication');
const generateAccessToken = require('../../utils/jwtUtils');

// TODO : use seperate table to store refresh tokens
let refreshTokens = [];

//get all users
router.route('/users').get(authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//register a user
router.route('/register').post(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPass = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//login
router.route('/').post(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { email } });

    if (user) {
      try {
        if (await bcrypt.compare(password, user.password)) {
          const authUser = { email: user.email };
          const accessToken = generateAccessToken(authUser);
          const refreshToken = jwt.sign(
            authUser,
            process.env.REFRESH_TOKEN_SECRET
          );
          refreshTokens.push(refreshToken);
          res.status(201).json({
            message: 'Login successful',
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        } else {
          res.status(401).json({ message: 'Incorrect Password' });
        }
      } catch {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      res.status(400).json({ message: 'Invalid email' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//refreshToken
router.route('/refresh-token').post((req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.sendStatus(401);
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(401).json({ message: 'No access' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken({ email: user.email });

    res.json({ accessToken: accessToken });
  });
});

//refreshToken
router.route('/logout').post((req, res) => {
  // TODO : need to implement the logout method
  // should delete the refresh token from the refresh token table
});

module.exports = router;
