const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

class ProjectsService {
  async getProjectsForUser(objectId) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let projects = [];
    try {
      await client.connect();
      const database = client.db("JamAppDb");
      const collection = database.collection("projects");
      const query = { ownerid: ObjectId(objectId) };
      const results = await collection.find(query).forEach((item) => {
        projects.push(item)
      });

    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    return projects;
  }
}

module.exports = ProjectsService;
