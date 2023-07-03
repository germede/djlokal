import { firestore } from "../firebase";
import GenreEL from "./Genre";

const db = firestore.collection("/djs");

class DJ {
  getAll() {
    return db;
  }

  async create(dj) {
    await this.validate(dj);
    return db.add(dj);
  }

  async update(id, value) {
    await this.validate(value);
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }

  async validate(dj) {
    let error = "";

    if (!dj.name || dj === "") error += "DJ name is required.\n";
    if (!(typeof dj.name === "string")) error += "DJ name must be a string.\n";
    if (dj.name.length > 20) error += "DJ name must be at most 20 chars.\n";
    await db.where("name", "==", dj.name)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        if (!(querySnapshot.empty))
          error += `There is already a DJ with name '${dj.name}'.\n`;
      });

    if (!dj.genre || !GenreEL[dj.genre]) error += "DJ genre is required.\n";

    if (error) throw Error(error);
  }
}

export default new DJ();
