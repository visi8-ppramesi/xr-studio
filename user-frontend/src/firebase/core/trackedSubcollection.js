import Subcollection from "./subcollection";
import { collection, getDocs, query } from "firebase/firestore";
import isNil from "lodash/isNil";

export default class extends Subcollection {
  async getChanges(queries = []) {
    if (isNil(this.id) || isNil(this.parentId)) {
      return {};
    }
    const changesRef = collection(
      this.constructor.db,
      this.constructor.collection,
      this.parentId,
      this.constructor.parentCollection,
      this.id,
      "changes"
    );
    let q;
    if (queries.legnth > 0) {
      q = query(changesRef, ...queries);
    } else {
      q = changesRef;
    }
    const snap = await getDocs(q);
    return snap.docs;
  }
}
