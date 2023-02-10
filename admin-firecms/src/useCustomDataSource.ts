import { useCallback } from "react";
import {
    CMSType,
    DataSource,
    DeleteEntityProps,
    Entity,
    FetchCollectionProps,
    FetchEntityProps,
    ResolvedProperty,
    SaveEntityProps,
    useFirestoreDataSource,
    FirestoreTextSearchController,
    resolveCollection,
    firestoreToCMSModel,
    EntityValues,
    ResolvedProperties,
    cmsToFirestoreModel,
    updateDateAutoValues
} from "ppramesi-firecms";
import { FirebaseApp } from "firebase/app";
import { setDoc, Timestamp, DocumentReference, getDoc, getFirestore, doc, collection as collectionClause, CollectionReference, serverTimestamp } from "firebase/firestore";
import axios from "axios";

type CustomDataSourceProps = { firebaseApp?: FirebaseApp, textSearchController?: FirestoreTextSearchController };

type DataManagerObject = {
    [name: string]: any
}

function setDateToMidnight(input?: Timestamp): Timestamp | undefined {
    if (!input) return input;
    const date = input.toDate();
    date.setHours(0, 0, 0, 0);
    return Timestamp.fromDate(date);
}

export function useCustomDatasource({ firebaseApp, textSearchController }: CustomDataSourceProps): DataSource {
    const firestoreDataSource = useFirestoreDataSource({
        firebaseApp,
        textSearchController
    });

    function buildSaveEntityFunction<M>(managerPath: string, dataObj: DataManagerObject): <M extends Record<string, any>>(props: SaveEntityProps<M>) => Promise<Entity<M>>{
        return useCallback(<M extends Record<string, any>>(
            props: SaveEntityProps<M>): Promise<Entity<M>> => {
            if (!firebaseApp) throw Error("useFirestoreDataSource Firebase not initialised");
            const {
                path,
                entityId,
                values,
                collection,
                status
            } = props
            const firestore = getFirestore(firebaseApp);
    
            const resolvedCollection = resolveCollection<M>({
                collection,
                path,
                entityId
            });
    
            const properties: ResolvedProperties<M> = resolvedCollection.properties;
            const collectionReference: CollectionReference = collectionClause(firestore, path);
    
            const firestoreValues = cmsToFirestoreModel(values, firestore);
            const updatedFirestoreValues: EntityValues<M> = updateDateAutoValues(
                {
                    inputValues: firestoreValues,
                    properties,
                    status,
                    timestampNowValue: serverTimestamp(),
                    setDateToMidnight
                });
    
            console.debug("Saving entity", path, entityId, updatedFirestoreValues);
    
            let documentReference: DocumentReference;
            if (entityId)
                documentReference = doc(collectionReference, entityId);
            else
                documentReference = doc(collectionReference);
    
            return axios.post(managerPath, dataObj)
                .then(() => ({
                    id: documentReference.id,
                    path,
                    values: firestoreToCMSModel(updatedFirestoreValues)
                }));
        }, [firebaseApp])
    }

    return {
        fetchCollection<M extends { [Key: string]: CMSType }>(props: FetchCollectionProps<M>): Promise<Entity<M>[]> {
            if (props.path === "your_path_custom") {

                // make your custom http call and return your Entities
            }
            return firestoreDataSource.fetchCollection(props);
        },
        fetchEntity<M extends { [Key: string]: CMSType }>(props: FetchEntityProps<M>): Promise<Entity<M> | undefined> {
            console.log("fetchEntity", props.path);
            if (props.path === "your_path_custom") {
                // make your custom http call and return your Entities
            }
            return firestoreDataSource.fetchEntity(props);
        },
        saveEntity<M extends { [Key: string]: CMSType }>(props: SaveEntityProps<M>): Promise<Entity<M>> {
            if (props.path === "your_path_custom") {
                // make your custom http call and return your Entities
                const saveEntityFunction = buildSaveEntityFunction("https://localhost:8080", {test: 1})
                return saveEntityFunction(props)
            }
            return firestoreDataSource.saveEntity(props);
        },
        deleteEntity<M extends { [Key: string]: CMSType }>(props: DeleteEntityProps<M>): Promise<void> {
            return firestoreDataSource.deleteEntity(props);
        },
        checkUniqueField(path: string, name: string, value: any, property: ResolvedProperty, entityId?: string): Promise<boolean> {
            return firestoreDataSource.checkUniqueField(path, name, value, property, entityId);
        },
        generateEntityId(path: string) {
            return firestoreDataSource.generateEntityId(path,);
        },
        countEntities(path: string): Promise<number> {
            return firestoreDataSource.countEntities(path);
        }
    }
}
