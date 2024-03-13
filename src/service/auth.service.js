const AuthAccessor = require("../accessors/auth.accessor");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/helpers");

const SessionInstance = AuthAccessor.createSessionInstance();
const CustomerInstance = AuthAccessor.createCustomerInstance();

class AuthService {
  async registerUser(email, password) {
    try {
      const duplicate = await CustomerInstance.findOne({ where: { email } });
      if (duplicate) {
        return { error: { status: 409, message: "User already exist." } };
      }

      const customer = await CustomerInstance.create({ email, password });
      const accessToken = signAccessToken({ email, userId: customer.id });
      const refreshToken = signRefreshToken({ email, userId: customer.id });

      await SessionInstance.create({
        customer_id: customer.id,
        refresh_token: refreshToken,
      });

      return {
        result: {
          tokens: { accessToken, refreshToken },
          message: "Customer and session created.",
        },
      };
    } catch (err) {
      return {
        error: { status: 500, message: "Register error occurred.", error: err },
      };
    }
  }

  async loginUser(email, password) {
    try {
      const customer = await CustomerInstance.findOne({
        where: { email, password },
      });

      if (!customer)
        return {
          result: { status: 409, message: "Email or password are wrong." },
        };

      const session = await SessionInstance.findOne({
        where: { customer_id: customer.id },
      });

      if (!session)
        return { error: { status: 403, message: "Token not found." } };

      const accessToken = signAccessToken({ email, userId: customer.id });
      const refreshToken = signRefreshToken({ email, userId: customer.id });

      await SessionInstance.update(
        { refresh_token: refreshToken },
        { where: { customer_id: customer.id } }
      );

      return {
        result: {
          tokens: { accessToken, refreshToken },
          message: "Customer and session created.",
        },
      };
    } catch (err) {
      console.log(err);
      return {
        error: { status: 500, message: "Login error occurred.", error: err },
      };
    }
  }

  async updateSession(token) {
    try {
      const { email, password } = verifyToken(token);
      const customer = await CustomerInstance.findOne({
        where: { email, password },
      });
      if (!customer)
        return {
          error: { status: 409, message: "Invalid credentials." },
        };

      const { newToken, issuedAt, expiresAt } = signToken({ email, password });
      await SessionInstance.update(
        {
          expires_at: expiresAt,
          issued_at: issuedAt,
          newToken,
        },
        { where: { customer_id: customer.id } }
      );

      return { success: true, message: "Session updated.", newToken };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: "Update token error occurred",
          error: err,
        },
      };
    }
  }

  async verifyUser(refreshToken) {
    try {
      const session = await SessionInstance.findOne({
        where: { refresh_token: refreshToken },
      });

      const customer = await CustomerInstance.findOne({
        where: { id: session.customer_id },
      });

      if (!session || !customer)
        return { error: { status: 403, message: "Token not found." } };

      const result = verifyRefreshToken(refreshToken, customer); // returns new accessToken
      const newRefreshToken = signRefreshToken({ email: customer.email });
      await SessionInstance.update(
        { refresh_token: newRefreshToken },
        { where: { customer_id: customer.id } }
      );

      return {
        result: {
          tokens: { accessToken: result, refreshToken: newRefreshToken },
        },
      };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: "Token verification error occurred.",
          error: err,
        },
      };
    }
  }
}

module.exports = new AuthService();
