import { firestore } from "../firebase";

const db = firestore.collection("/feedbacks");
import { default as eventDB } from "./Event";

class Feedback {
  getAll() {
    return db;
  }

  async create(feedback) {
    await this.validate(feedback);
    await db.add(feedback);
  }

  async update(id, value) {
    await this.validate(value);
    await db.doc(id).update(value);
  }

  async delete(id) {
    await db.doc(id).delete();
  }

  async validate(feedback) {
    let error = "";

    if (!feedback.collection || feedback.collection === "")
      error += "Feedback collection is required.\n";
    else if (!(typeof feedback.collection === "string"))
      error += "Feedback collection must be a string.\n";
    else if (
      feedback.collection !== "djs" &&
      feedback.collection !== "events" &&
      feedback.collection !== "venues")
      error += "Feedback collection must be either djs or events or venues.\n";

    if (!feedback.document || feedback.document === "")
      error += "Feedback document is required.\n";
    else if (!(typeof feedback.document === "string"))
      error += "Feedback document must be a string.\n";
    else if (feedback.collection === "events")
      await eventDB.getAll()
        .where("name", "==", feedback.document)
        .get()
        .then((qS) => {
          qS.docs.map((doc) => {
            const event = eventDB.fromFirestore(doc);
            const eventDate = new Date(event.date);
            if (eventDate >= new Date()) {
              error += "No event feedback allowed before it has happened.\n";
            }
          });
        });
        
    if (!feedback.stars)
      error += "Feedback stars is required.\n";
    else if (!Number.isInteger(feedback.stars))
      error += "Feedback stars must be an integer.\n";
    else if (Number.parseInt(feedback.stars) < 1)
      error += "Feedback stars must be a positive integer.\n";
    else if (Number.parseInt(feedback.stars) > 5)
      error += "Feedback stars must be at most 5.\n";

    if (feedback.comment && !(typeof feedback.comment === "string"))
      error += "Feedback comment must be a string.\n";

    if (error) throw Error(error);
  }

  empty() {
    return { 
      collection: "",
      document: "",
      stars: 3, 
      comment: "" 
    };
  }

  fromFirestore(snapshot) {
    let id = snapshot.id;
    let data = snapshot.data();
    return {
      id: id,
      collection: data.collection,
      document: data.document,
      stars: data.stars,
      comment: data.comment,
    };
  }
}

export default new Feedback();
