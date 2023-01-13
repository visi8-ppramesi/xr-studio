import Collection from "../../core/collection";
import fb from "@/firebase/firebase";
import { collection, doc, where, query, getDocs } from "firebase/firestore";
import { InstanceProjection } from "../../core/types";
import chunk from "lodash/chunk";
import flatten from "lodash/flatten";

export default class extends Collection{
    static collection = 'calendar'
    static orderByParam = 'start_date'
    static fields = {
        start_date: Date,
        end_date: Date,
        event_id: Collection.resolve('../shoots/shoot'),
        event: new InstanceProjection({
            status: Array,
            location: String,
        }),
    }

    static async getMyCalendar() {
        const { currentUser } = fb.auth;
        if (!currentUser) {
            throw new Error("Not Logged In!");
        }
    
        const { uid: userId } = currentUser;
    
        const userRef = doc(fb.db, "users", userId);
        const shootRef = query(
            collection(fb.db, "shoots"),
            where("created_by", "==", userRef)
        );
    
        const shootIds = await getDocs(shootRef).then((snap) => {
            return Object.values(snap.docs).map((v) => doc(fb.db, "shoots", v.id));
        });
    
        const chunkedShootIds = chunk(shootIds, 10);
        const calendarPromisesArray = chunkedShootIds.map((tenShootId) => {
            return this.getDocuments([where("event_id", "in", tenShootId)]);
        });
    
        return Promise.all(calendarPromisesArray).then(flatten);
    }
    
}