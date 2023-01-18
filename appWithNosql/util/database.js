const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://admin_ope:Habeeb9182@cluster0.ktwepk2.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then(client => {
      console.log("MONGODB CONNECTED");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};
/*
MongoClient.connect(
  "mongodb+srv://admin_ope:Habeeb9182@cluster0.w1ag4ks.mongodb.net/?retryWrites=true&w=majority"
)
  .then(result => console.log("MONGODB CONNECTED"))
  .catch(err => console.log(err));
*/
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
