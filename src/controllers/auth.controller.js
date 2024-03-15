const { registerUser, loginUser, refreshToken } = require('../service/auth.service');

class AuthController {
  async signup(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.sendStatus(400);

    const { result, error } = await registerUser(email, password, name);
    if (error) return res.status(error.status).json(error.message);

    return res.status(200).json(result.token);
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);

    const { result, error } = await loginUser(email, password);
    if (error) return res.status(error.status).json(error.message);

    return res.status(200).json(result.token);
  }

  async refresh(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    const { result, error } = await refreshToken(token);
    if (error) return res.status(error.status).json(error.message);

    return res.status(200).json(result);
  }
}

module.exports = new AuthController();
