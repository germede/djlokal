import { firestore } from "../firebase";

const db = firestore.collection("/venues");

class Venue {
  getAll() {
    return db;
  }

  async create(venue) {
    await this.validate(venue);
    return db.add(venue);
  }

  async update(id, value) {
    await this.validate(value);
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }

  async validate(venue) {
    let error = "";

    if (!venue.name || venue.name === "")
      error += "Venue name is required.\n";
    else if (!(typeof venue.name === "string")) 
      error += "Venue name must be a string.\n";
    else if (venue.name.length > 20) 
      error += "Venue name must be at most 20 chars.\n";
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
    else if (venue.address.length < 20) 
      error += "Venue address must be at least 20 chars.\n";


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
}

export default new Venue();
