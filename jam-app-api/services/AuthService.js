const jsonwebtoken = require("jsonwebtoken");
const config = require("config");
const MongoClient = require("mongodb").MongoClient;

class AuthService {
  async generateToken() {
    const payload = { auth: "true" };
    const token = await jsonwebtoken.sign(payload, config.get("jwt.secret"), {
      expiresIn: 24 * 60 * 60,
    });
    return token;
  }

  async validateUser(username, password) {
    const uri = config.get("mongo.uri");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let isValid = true;
    let user = null;
    try {
      await client.connect();
      const database = client.db(config.get("mongo.db"));
      const collection = database.collection("users");
      const query = { username: username, password: password };
      user = await collection.findOne(query);
      if (user === null) {
        isValid = false;
      } 
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    if (isValid === false) {
      return null;
    } else {
      return { id: user._id };
    }
  }

  async getToken(username, password) {
    const user = await this.validateUser(username, password);
    if (user !== null) {
      const token = await this.generateToken();
      return { id: user.id, username: username, jwt: token };
    } else {
      return { id: null, username: null, jwt: null };
    }
  }
}

module.exports = AuthService;
