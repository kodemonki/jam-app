const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

class AuthService {
  getToken(username, password) {
    
    /**
     * assume its valid
     */

    const payload = { auth: "true" };
    const token = jsonwebtoken.sign(payload, config.get("jwt.secret"), {
      expiresIn: 24 * 60 * 60,
    });

    return { jwt: token };
  }
}

module.exports = AuthService;