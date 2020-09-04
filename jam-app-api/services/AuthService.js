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
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let isValid = true;
    try {
      await client.connect();
      const database = client.db("JamAppDb");
      const collection = database.collection("users");
      const query = { username: username, password: password };
      const user = await collection.findOne(query);
      if (user === null) {
        isValid = false;
      }
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
    return isValid;
  }

  async getToken(username, password) {
    const isValid = await this.validateUser(username, password);
    if (isValid === true) {
      const token = await this.generateToken();
      return { jwt: token };
    } else {
      return { jwt: null };
    }
  }
}

module.exports = AuthService;
