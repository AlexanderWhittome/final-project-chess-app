const { MongoClient } = require("mongodb");

const MONGO_URI =
  "mongodb+srv://new-user-1:mongodb1@cluster0.d7ely.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const DB_NAME = "chessDB";

let db;

function initialiseMongoClient() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(MONGO_URI, options);

  client.connect((err) => {
    if (err) {
      throw err;
    }

    db = client.db(DB_NAME);
  });
}

module.exports = { initialiseMongoClient, db: () => db };
