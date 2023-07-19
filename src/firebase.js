import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBWCtSKRPEHb2vNGk10kIahVrBfvf3gaxE",
  authDomain: "webapp23-group5.firebaseapp.com",
  projectId: "webapp23-group5",
  storageBucket: "webapp23-group5.appspot.com",
  messagingSenderId: "798645134664",
  appId: "1:798645134664:web:0d7092335b6cab37bdbf7d"
};

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);
const auth = firebase.auth(app);

async function updateOnCascade(db, collection, field, model, id, value, arr) {
  await db
    .doc(id)
    .get()
    .then((qS) => {
      let oldValue = model.prototype.fromFirestore(qS).name;
      let refDB = firestore.collection("/" + collection);
      refDB
        .where(
          field,
          arr ? "array-contains" : "==",
          oldValue
        )
        .get()
        .then((qS) => {
          qS.docs.map((doc) => {
            let toUpdate = {};
            if (arr) {
              const newArray = [];
              for (const oldString of doc.data()[field]) {
                if (oldString === oldValue) newArray.push(value);
                else newArray.push(oldString);
              }
              toUpdate[field] = newArray;
            } else {
              toUpdate[field] = value;
            }
            refDB.doc(doc.id).update(toUpdate);
          });
        });
    });
}

async function deleteOnCascade(db, collection, field, model, id) {
  await db
    .doc(id)
    .get()
    .then((qS) => {
      let oldValue = model.prototype.fromFirestore(qS).name;
      let refDB = firestore.collection("/" + collection);
      refDB
        .where(
          field,
          "==",
          oldValue
        )
        .get()
        .then((qS) => {
          qS.docs.map((doc) => {
            refDB.doc(doc.id).delete();
          });
        });
    });
}


export { firestore, auth, updateOnCascade, deleteOnCascade };
