import { firestore } from "../firebase"; \
import GenreEL from "./Genre";
import { db as venueDB } from "./Venue";
import { db as djDB } from "./DJ";

const db = firestore.collection("/events");

class Event {
  getAll() {
    return db;
  }

  async create(event) {
    await this.validate(event);
    return db.add(event);
  }

  async update(id, value) {
    await this.validate(value);
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }

  async validate(event) {
    let error = "";

    if (!event.name || event.name === "")
      error += "Event name is required.\n";
    else if (!(typeof event.name === "string"))
      error += "Event name must be a string.\n";
    else if (event.name.length > 20)
      error += "Event name must be at most 20 chars.\n";
    await db.where("name", "==", event.name)
      .get()
      .then((querySnapshot) => {
        if (!(querySnapshot.empty) && (querySnapshot.id !== event.id))
          error += `There is already a Event with name '${event.name}'.\n`;
      });

    if (!event.genres)
      error += "DJ genres are required.\n";
    else event.genres.forEach(genre => {
      if (!GenreEL[genre])
        error += `'${genre}' is not a genre.\n`;
    });

    let datetime = new Date(event.datetime);
    if (!datetime)
      error += "Event datetime is required.\n";
    else if (!(typeof datetime === Date))
      error += "Event datetime must be a Date.\n";

    if (!event.venue)
      error += "Event venue is required.\n";
    await venueDB.where("id", "==", event.venue)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty)
          error += `There is no venue with ID '${event.venue}'.\n`;
      });

    if (!event.djs)
      error += "At least one event DJ is required.\n";
    await event.djs.forEach(id => {
      djDB.where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty)
            error += `There is no DJ with ID '${id}'.\n`;
        });
    });

    if (error) throw Error(error);
  }
}

export default new Event();
