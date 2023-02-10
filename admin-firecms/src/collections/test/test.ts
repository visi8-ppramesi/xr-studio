import { Test } from "@/types/index";
import {
    buildCollection,
    EntityIdUpdateProps,
    UploadedFileContext,
    EntityOnSaveProps,
    EntityCustomViewParams
} from "ppramesi-firecms";
import { transformPathToGS, buildPostProcessFunction, buildStoragePathFunction } from "@utils/pathTransformers";
import React from "react";
import debounce from "lodash/debounce"
import { SampleTestsView } from "../../views/test"

import { SampleCollectionActions } from "../../actions/SampleCollectionActions"

type TestSubcollectionType = {
    string_subcollection: string,
    test_subcollection_image: string
}

type TestSubsubcollectionType = {
    string_subsubcollection: string,
    test_subsubcollection_image: string
}

const testSubsubcollection = buildCollection<TestSubsubcollectionType>({
    name: "Test Subsubcollection",
    path: "subsubcollection_test",
    properties: {
        string_subsubcollection: {
            name: "Test String",
            dataType: "string"
        },
        test_subsubcollection_image: {
            name: "Test",
            dataType: "string",
            storage: {
                storagePath: buildStoragePathFunction(["test_images", "$firecms_test", "shitfuck"]),
                acceptedFiles: ["image/*"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: function(ctx: UploadedFileContext): string {
                    return ctx.file.name
                },
                postProcess: buildPostProcessFunction()
            }
        },
    },
})

const testSubcollection = buildCollection<TestSubcollectionType>({
    name: "Test Subcollection",
    path: "subcollection_test",
    properties: {
        string_subcollection: {
            name: "Test String",
            dataType: "string"
        },
        test_subcollection_image: {
            name: "Test",
            dataType: "string",
            storage: {
                storagePath: buildStoragePathFunction(["test_images", "$firecms_test", "$subcollection_test"]),
                acceptedFiles: ["image/*"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: function(ctx: UploadedFileContext): string {
                    return ctx.file.name
                },
                postProcess: buildPostProcessFunction()
            }
        },
    },
    subcollections: [testSubsubcollection]
})

export const buildTestCollection = () => {
    return buildCollection<Test>({
        name: "Test",
        path: "firecms_test",
        permissions: {
            create: false,
            read: true
        },
        Actions: [
            SampleCollectionActions
        ],
        views: [
            {
                path: "testingg",
                name: "Stuff",
                builder: (props: EntityCustomViewParams<Test>) => {
                    const { entity, modifiedValues } = props
                    return SampleTestsView()
                }
            }
        ],
        // callbacks: {
        //     onPreSave(entitySaveProps: EntityOnSaveProps<Test>){
        //         entitySaveProps.values.test_string = Math.random().toString(36).substring(2)
        //         return entitySaveProps.values
        //     }
        // },
        properties: {
            test_test: {
                name: "Test Test Test",
                dataType: "string"
            },
            test_string: {
                name: "Test Test",
                dataType: "string"
            },
            test_image: {
                name: "Test",
                dataType: "string",
                storage: {
                    storagePath: buildStoragePathFunction(["test_images", "$firecms_test"]),
                    acceptedFiles: ["image/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    fileName: function(ctx: UploadedFileContext): string {
                        return ctx.file.name
                    },
                    postProcess: buildPostProcessFunction()
                }
            },
        },
        subcollections: [testSubcollection]
    })
}

export const testCollection = buildCollection<Test>({
    name: "Test",
    path: "firecms_test",
    // callbacks: {
    //     onIdUpdate(idUpdateProps: EntityIdUpdateProps<Test>){
    //         console.log("adsfasdfadsf")
    //         idUpdateProps.values.test_string = Math.random().toString(36).substring(2)
    //         return "shitufkc"
    //     }
    // },
    properties: {
        test_test: {
            name: "Test Test Test",
            dataType: "string"
        },
        test_string: {
            name: "Test Test",
            dataType: "string"
        },
        test_image: {
            name: "Test",
            dataType: "string",
            storage: {
                storagePath: buildStoragePathFunction(["test_images", "$firecms_test"]),
                acceptedFiles: ["image/*"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: function(ctx: UploadedFileContext): string {
                    return ctx.file.name
                },
                postProcess: buildPostProcessFunction()
            }
        },
    },
    subcollections: [testSubcollection]
})