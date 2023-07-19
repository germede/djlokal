import { firestore, updateOnCascade, deleteOnCascade } from "../firebase";
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
    await updateOnCascade(db, "events", "djs", DJ, id, value.name, true);
    await updateOnCascade(
      db, "feedbacks", "document", DJ, id, value.name, false
    );
    await db.doc(id).update(value);
  }

  async delete(id) {
    await deleteOnCascade(db, "feedbacks", "document", DJ, id);
    await db.doc(id).delete();
  }

  async validate(dj) {
    let error = "";

    if (!dj.name || dj.name === "")
      error += "DJ name is required.\n";
    else if (!(typeof dj.name === "string"))
      error += "DJ name must be a string.\n";
    else if (dj.name.length > 30)
      error += "DJ name must be at most 30 chars.\n";
    await db.where("name", "==", dj.name)
      .get()
      .then((querySnapshot) => {
        if (!(querySnapshot.empty) && (querySnapshot.id !== dj.id))
          error += `There is already a DJ with name '${dj.name}'.\n`;
      });

    if (!dj.genre)
      error += "DJ genre is required.\n";
    else if (!GenreEL[dj.genre])
      error += `'${dj.genre}' is not a genre.\n`;

    if (error) throw Error(error);
  }

  empty() {
    return {
      name: "",
      genre: "",
    };
  }

  fromFirestore(snapshot) {
    let id = snapshot.id;
    let data = snapshot.data();
    return {
      id: id,
      name: data.name,
      genre: data.genre,
    };
  }
}

export default new DJ();
