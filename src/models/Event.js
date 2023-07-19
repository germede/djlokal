import { firestore, updateOnCascade, deleteOnCascade } from "../firebase";
import GenreEL from "./Genre";
const db = firestore.collection("/events");

class Event {
  getAll() {
    return db;
  }

  async create(event) {
    await this.validate(event);
    await db.add(event);
  }

  async update(id, value) {
    await this.validate(value);
    await updateOnCascade(
      db, "feedbacks", "document", Event, id, value.name, false
    );
    await db.doc(id).update(value);
  }

  async delete(id) {
    await deleteOnCascade(db, "feedbacks", "document", Event, id);
    await db.doc(id).delete();
  }

  async validate(event) {
    let error = "";

    if (!event.name || event.name === "")
      error += "Event name is required.\n";
    else if (!(typeof event.name === "string"))
      error += "Event name must be a string.\n";
    else if (event.name.length > 40)
      error += "Event name must be at most 40 chars.\n";
    await db.where("name", "==", event.name)
      .get()
      .then((querySnapshot) => {
        if (!(querySnapshot.empty) && (querySnapshot.id !== event.id))
          error += `There is already a Event with name '${event.name}'.\n`;
      });

    if (!event.genres || event.genres.length <= 0)
      error += "DJ genres are required.\n";
    else event.genres.forEach(genre => {
      if (!GenreEL[genre])
        error += `'${genre}' is not a genre.\n`;
    });

    if (!event.date || event.date === "")
      error += "Event date is required.\n";

    if (!event.time || event.time === "")
      error += "Event time is required.\n";

    if (!event.venue)
      error += "Event venue is required.\n";

    if (!event.djs || event.djs.length <= 0)
      error += "At least one event DJ is required.\n";


    if (error) throw Error(error);
  }

  empty() {
    return {
      name: "",
      genres: "",
      date: "",
      time: "",
      venue: "",
      djs: "",
    };
  }

  fromFirestore(snapshot) {
    let id = snapshot.id;
    let data = snapshot.data();
    return {
      id: id,
      name: data.name,
      genres: data.genres,
      date: data.date,
      time: data.time,
      venue: data.venue,
      djs: data.djs,
    };
  }
}

export default new Event();
