const function1 = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
// var admin = require("firebase-admin");
app.use(cors({origin: true}));
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


app.post("/api/create", (req, res) => {
  (async () => {
    try {
      await db.collection("products").doc("/" + req.body.id + "/")
          .create(req.body.product);
      return res.status(200).send({"status": "successfully created"});
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/notifications/create", (req, res) => {
  (async () => {
    try {
      await db.collection("strnotify").doc("/" + req.body.id + "/")
          .create(req.body.notification);
      return res.status(200).send({"status": "successfully created"});
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// read

app.get("/api/read/:prod_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("products").doc(req.params.prod_id);
      const item = await document.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/hello-world", (req, res) => {
  return res.status(200).json({message: "Hello World"});
});


exports.app = function1.https.onRequest(app);
