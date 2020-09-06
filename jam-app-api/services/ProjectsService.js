const config = require("config");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

class ProjectsService {
  async getDetailForProject(objectId) {
    const uri = config.get("mongo.uri");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let project = null;
    try {
      await client.connect();
      const database = client.db(config.get("mongo.db"));
      const collection = database.collection("projects");
      const query = { _id: ObjectId(objectId) };
      project = await collection.findOne(query);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
    return project;
  }

  async newProjectForUser(objectId, project) {
    const uri = config.get("mongo.uri");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const database = client.db(config.get("mongo.db"));
      const collection = database.collection("projects");
      const query = { name: project.name, ownerid: ObjectId(objectId) };
      await collection.insertOne(query);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    return true;
  }

  async getProjectsForUser(objectId) {
    const uri = config.get("mongo.uri");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let projects = [];
    try {
      await client.connect();
      const database = client.db(config.get("mongo.db"));
      const collection = database.collection("projects");
      const query = { ownerid: ObjectId(objectId) };
      const projection = { projection: { name: 1 } };
      await collection.find(query, projection).forEach((item) => {
        projects.push(item);
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
