const { createUserInstance } = require('../accessors/user.accessor');
const { createOrganizationInstance } = require('../accessors/organization.accessor');
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require('../utils/helpers');
const { roles } = require('../utils/constants');

const OrganizationInstance = createOrganizationInstance();
const UserInstance = createUserInstance();

class AuthService {
  async registerUser(email, password, name) {
    try {
      const duplicate = await UserInstance.findOne({ where: { email } });
      if (duplicate) {
        return { error: { status: 409, message: 'User already exist.' } };
      }

      const accessToken = signAccessToken({ email, roles: [roles.employee] });
      const refreshToken = signRefreshToken({ email, roles: [roles.employee] });

      await UserInstance.create({
        email,
        password,
        name,
        refresh_token: refreshToken,
        roles: [roles.employee],
      });

      return {
        result: { token: accessToken, message: 'User was registered.' },
      };
    } catch (err) {
      return {
        error: { status: 500, message: 'Register error occurred.', error: err },
      };
    }
  }

  async registerOrganizator(email, password, name) {
    //TODO: add org register
  }

  async loginUser(email, password) {
    try {
      const user = await UserInstance.findOne({ where: { email, password } });
      if (!user) {
        return { error: { status: 401, message: 'Email or password are wrong.' } };
      }
      const accessToken = signAccessToken({ email, roles: [roles.employee] });

      return {
        result: { token: accessToken, message: 'User was logged in.' },
      };
    } catch (err) {
      console.log(err);
      return {
        error: { status: 500, message: 'Login error occurred.', error: err },
      };
    }
  }

  async refreshToken(token) {
    try {
      const { email } = verifyAccessToken(token);
      const user = await UserInstance.findOne({ where: { email } });

      if (!user) {
        return { error: { status: 401, message: 'User not found.' } };
      }
      // TODO: handle errors scenarios
      const newAccessToken = verifyRefreshToken(user.refresh_token, {
        email,
        roles: user.roles,
      });

      return {
        result: { token: newAccessToken, message: 'Token was refreshed.' },
      };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: 'Token refresh error occurred.',
          error: err,
        },
      };
    }
  }
}

module.exports = new AuthService();
