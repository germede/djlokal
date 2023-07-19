import { firestore, updateOnCascade, deleteOnCascade} from "../firebase";

const db = firestore.collection("/venues");

class Venue {
  getAll() {
    return db;
  }

  async create(venue) {
    await this.validate(venue);
    await db.add(venue);
  }

  async update(id, value) {
    await this.validate(value);
    await updateOnCascade(db, "events", "venue", Venue, id, value.name, false);
    await updateOnCascade(
      db, "feedbacks", "document", Venue, id, value.name, false
    );
    await db.doc(id).update(value);
  }

  async delete(id) {
    await deleteOnCascade(db, "feedbacks", "document", Venue, id);
    await db.doc(id).delete();
  }

  async validate(venue) {
    let error = "";

    if (!venue.name || venue.name === "")
      error += "Venue name is required.\n";
    else if (!(typeof venue.name === "string"))
      error += "Venue name must be a string.\n";
    else if (venue.name.length > 30)
      error += "Venue name must be at most 30 chars.\n";
    await db.where("name", "==", venue.name)
      .get()
      .then((querySnapshot) => {
        if (!(querySnapshot.empty) && (querySnapshot.id !== venue.id))
          error += `There is already a Venue with name '${venue.name}'.\n`;
      });

    if (!venue.address || venue.address === "")
      error += "Venue address is required.\n";
    else if (!(typeof venue.address === "string"))
      error += "Venue address must be a string.\n";

    if (!venue.capacity)
      error += "Venue capacity is required.\n";
    else if (!Number.isInteger(venue.capacity))
      error += "Venue capacity must be an integer.\n";
    else if (Number.parseInt(venue.capacity) < 1)
      error += "Venue capacity must be a positive integer.\n";

    if (venue.contact && !(typeof venue.contact === "string"))
      error += "Venue contact must be a string.\n";

    if (error) throw Error(error);
  }

  empty() {
    return {
      name: "",
      address: "",
      capacity: 1,
      contact: "",
    };
  }

  fromFirestore(snapshot) {
    let id = snapshot.id;
    let data = snapshot.data();
    return {
      id: id,
      name: data.name,
      address: data.address,
      capacity: data.capacity,
      contact: data.contact,
    };
  }
}

export default new Venue();
