const AuthService = require("../service/auth.service");

class AuthController {
  async signup(req, res) {
    const { email, password } = req.body; // { email: undefined, password: undefined }
    if (!email || !password) return res.sendStatus(402);

    const { result, error } = await AuthService.registerUser(email, password);
    if (error) return res.status(500).json(error.message);

    res.cookie("jwt", result.tokens.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(result.tokens.accessToken);
  }

  async signin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(402);

    const { result, error } = await AuthService.loginUser(email, password);
    if (error || !result.tokens?.refreshToken)
      return res.status(error.status).json(error.message);

    res.cookie("jwt", result.tokens.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(result.tokens.accessToken);
  }

  async refresh(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(402);

    const { result, error } = await AuthService.verifyUser(cookies.jwt);
    if (error) return res.status(error.status).json(error.message);

    res.cookie("jwt", result.tokens.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(result.tokens.accessToken);
  }
}

module.exports = new AuthController();
