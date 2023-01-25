import React, { useCallback, useState } from "react";

import { User as FirebaseUser } from "firebase/auth";
import { firebaseConfig } from "@utils/firebase"
import {
  Authenticator,
  // buildProperty,
  // EntityReference,
  FirebaseCMSApp,
  FirebaseLoginView,
  FirebaseLoginViewProps,
  EnumValues,
} from "@camberi/firecms";

import { userCollection } from "./collections/user/user";
import { shootCollection } from "./collections/shoot/shoot";
import { buildAssetCollection } from "./collections/asset/asset";
import { buildEquipmentCollection } from "./collections/equipment/equipment";
import { procedureTypeCollection } from "./collections/procedureType/procedureType";
import { contractTemplatesCollection } from "./collections/contractTemplates/contractTemplates";
import { submissionFormsCollection } from "./collections/submissionForms/submissionForms";
import { equipmentTypeCollection } from "./collections/equipmentTypes/equipmentTypes";
import { equipmentCategoryCollection } from "./collections/equipmentCategories/equipmentCategories";
import { assetCategoryCollection } from "./collections/assetCategories/assetCategories";
import { buildUserRoleCollection } from "./collections/userRoles/userRoles";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import { db } from "@utils/firebase"
import { collection, doc, getDoc } from "firebase/firestore"

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
    user,
    authController
  }) => {
    const uid = user?.uid;
    const userRolesColl = collection(db, "user_roles");
    const userRolesRef = doc(userRolesColl, uid);
    const userRoles = await getDoc(userRolesRef);
    const roles = userRoles.get("roles") as Array<string>
    if(!roles.includes("admin")) {
      return false;
    }
    // This is an example of retrieving async data related to the user
    // and storing it in the user extra field.
    const sampleUserRoles = await Promise.resolve(["admin"]);
    authController.setExtra(sampleUserRoles);

    return true;
  }, []);

  const ShitFuckLoginView = function({ allowSkipLogin, logo, signInOptions, firebaseApp, authController, noUserComponent, disabled, additionalComponent, notAllowedError }: FirebaseLoginViewProps){
    return FirebaseLoginView({
      allowSkipLogin, 
      logo, 
      signInOptions, 
      firebaseApp, 
      authController, 
      noUserComponent, 
      disabled, 
      additionalComponent, 
      notAllowedError,
      disableSignupScreen: true
    })
  }

  return <FirebaseCMSApp
    name={"XR Studio Backend"}
    authentication={myAuthenticator}
    collections={[
      shootCollection, 
      userCollection, 
      buildAssetCollection(useState<EnumValues>({})), 
      buildEquipmentCollection(
        useState<EnumValues>({}), 
        useState<EnumValues>({}), 
        useState<EnumValues>({}),
        useState({})
      ), 
      procedureTypeCollection, 
      contractTemplatesCollection, 
      submissionFormsCollection,
      equipmentTypeCollection,
      equipmentCategoryCollection,
      assetCategoryCollection,
      buildUserRoleCollection(useState<EnumValues>({}))
    ]}
    firebaseConfig={firebaseConfig}
    signInOptions={["password"]}
    LoginView={ShitFuckLoginView}
  />;
}