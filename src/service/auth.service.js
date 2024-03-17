const { createUserInstance } = require('../accessors/user.accessor');
const { createOrganizationInstance } = require('../accessors/organization.accessor');
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require('../utils/helpers');
const { roles, rolesArray } = require('../utils/constants');
const { sequelize } = require('../../db');

const OrganizationInstance = createOrganizationInstance();
const UserInstance = createUserInstance();

class AuthService {
  async registerUser(email, password, name) {
    try {
      const duplicate = await UserInstance.findOne({ where: { email } });
      if (duplicate) {
        return { error: { status: 409, message: 'User already exist.' } };
      }
      const refreshToken = signRefreshToken({ email, roles: [roles.employee] });

      const user = await UserInstance.create({
        email,
        password,
        name,
        refresh_token: refreshToken,
        roles: [roles.employee],
      });

      const accessToken = signAccessToken({ email, roles: [roles.employee], id: user.id });

      return {
        result: { token: accessToken, roles: [roles.employee], message: 'User was registered.' },
      };
    } catch (err) {
      return {
        error: { status: 500, message: 'Register error occurred.', error: err.message },
      };
    }
  }

  async registerAdmin(email, password, name, organization_name, headquarter_address) {
    try {
      const duplicate = await UserInstance.findOne({ where: { email } });
      let user = null;
      if (duplicate) {
        return { error: { status: 409, message: 'User already exist.' } };
      }
      const refreshToken = signRefreshToken({ email, roles: [...rolesArray] });
      await sequelize.transaction(async (transaction) => {
        user = await UserInstance.create(
          {
            email,
            password,
            name,
            refresh_token: refreshToken,
            roles: [...rolesArray],
          },
          { transaction },
        );

        await OrganizationInstance.create(
          {
            created_by: user.id,
            organization_name,
            headquarter_address,
          },
          { transaction },
        );
      });

      const accessToken = signAccessToken({ email, roles: [...rolesArray], id: user.id });

      return {
        result: {
          token: accessToken,
          roles: [...rolesArray],
          message: 'Admin and organization was registered.',
        },
      };
    } catch (err) {
      return {
        error: { status: 500, message: 'Register error occurred.', error: err.message },
      };
    }
  }

  async loginUser(email, password) {
    try {
      const user = await UserInstance.findOne({ where: { email, password } });
      if (!user) {
        return { error: { status: 401, message: 'Email or password are wrong.' } };
      }

      const accessToken = signAccessToken({ email, roles: user.roles, id: user.id });

      return {
        result: { token: accessToken, roles: user.roles, message: 'User was logged in.' },
      };
    } catch (err) {
      return {
        error: { status: 500, message: 'Login error occurred.', error: err.message },
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
        id: user.id,
      });

      return {
        result: { token: newAccessToken, roles: user.roles, message: 'Token was refreshed.' },
      };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: 'Token refresh error occurred.',
          error: err.message,
        },
      };
    }
  }
}

module.exports = new AuthService();
