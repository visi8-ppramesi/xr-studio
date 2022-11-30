

process.env.USE_DOTENV = "true"
process.env.MODE = "development"

const createShoot = require("../services/createShoot")()
const editShoot = require("../services/editShoot")()
const { admin } = require('../utils/initializeAdmin.js')
const cloneDeep = require("lodash/cloneDeep")

Object.prototype.clone = function(){
    return {...cloneDeep(this)}
}

Array.prototype.clone = function(){
    return [...cloneDeep(this)]
}

const beforeAfter = []
const db = admin.firestore()
let returnValue
const res = {
    send(stuff){
        returnValue = stuff
    }
}
describe("Shooting Manager", function () {
    // const OLD_ENV = process.env;

    // beforeEach(() => {
    //     jest.resetModules() // Most important - it clears the cache
    //     process.env = { ...OLD_ENV }; // Make a copy
    // });

    // afterAll(() => {
    //     process.env = OLD_ENV; // Restore old environment
    // });

    test("Test Create", async function(){
        const req = {
            header(h){
                return {
                    'Authorization': 'Bearer ASDFasdfZXCVzxcvQWERqwer'
                }[h] || {}
            },
            body: {
                message: {
                    data: {
                        procedures: [
                            {
                                status: ["initialized", "unpaid"],
                                procedure_type: db.collection("procedure_types").doc("9533e77b-3b49-4ee1-9af1-9552805aaf32"),
                                procedure_start: new Date(),
                                procedure_end: new Date(),
                                price: 100_000_000
                            },
                            {
                                status: ["initialized", "unpaid"],
                                procedure_type: db.collection("procedure_types").doc("49d6b237-4326-477d-83f0-d6aa88719fc6"),
                                procedure_start: new Date(),
                                procedure_end: new Date(),
                                price: 100_000_000
                            }
                        ],
                        equipments: [
                            {
                                equipment: {
                                    id: "f6b1f614-c305-4a38-b0fd-b2a19174c29d",
                                    name: "asdfasdf"
                                },
                                equipment_id: db.collection("equipments").doc("f6b1f614-c305-4a38-b0fd-b2a19174c29d"),
                                quantity: 100,
                                price_item: 1000000,
                                total_price: 100 * 1000000
                            },
                            {
                                equipment: {
                                    id: "17a114f3-6957-47ac-85b2-3ceeeb0b215d",
                                    name: "asdfasdf 2"
                                },
                                equipment_id: db.collection("equipments").doc("17a114f3-6957-47ac-85b2-3ceeeb0b215d"),
                                quantity: 100,
                                price_item: 1000000,
                                total_price: 100 * 1000000
                            },
                        ],
                        assets: [
                            {
                                asset: {
                                    id: "2be66c28-866c-452c-a813-3eda1687b39e",
                                    name: "asdfasdf 4"
                                },
                                asset_id: db.collection("assets").doc("2be66c28-866c-452c-a813-3eda1687b39e"),
                                price: 100_000_000,
                            },
                            {
                                asset: {
                                    id: "b02e82ee-798c-44c3-87f7-e5cb919ef741",
                                    name: "asdfasdf 3"
                                },
                                asset_id: db.collection("assets").doc("b02e82ee-798c-44c3-87f7-e5cb919ef741"),
                                price: 100_000_000,
                            },
                        ],
                        shoot: {
                            
                        }
                    }
                }
            }
        }
        await createShoot(req, res)
        beforeAfter.push(db.store.state.clone())
    })

    test("Test Edit", async function(){
        const { result } = returnValue
        const data = {
            procedures: {
                added: [
                    {
                        status: ["initialized", "unpaid"],
                        procedure_type: db.collection("procedure_types").doc("00c33d23-09c2-4f57-9005-982ea114296a"),
                        procedure_start: new Date(),
                        procedure_end: new Date(),
                        price: 100_000_000
                    },
                    {
                        status: ["initialized", "unpaid"],
                        procedure_type: db.collection("procedure_types").doc("a2339cee-1d69-4445-a6ef-5f41080c3650"),
                        procedure_start: new Date(),
                        procedure_end: new Date(),
                        price: 100_000_000
                    }
                ],
                updated: [
                    {
                        id: result.procedures[0].procedure_id,
                        status: ["paid"],
                        procedure_type: db.collection("procedure_types").doc("00c33d23-09c2-4f57-9005-982ea114296a"),
                        procedure_start: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7)),
                        procedure_end: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 8)),
                        price: 100_000_000_00
                    },
                    {
                        id: result.procedures[1].procedure_id,
                        status: ["paid"],
                        procedure_type: db.collection("procedure_types").doc("a2339cee-1d69-4445-a6ef-5f41080c3650"),
                        procedure_start: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7)),
                        procedure_end: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 9)),
                        price: 100_000_000_00
                    }
                ],
                deleted: [

                ]
            },
            equipments: {
                added: [

                ],
                updated: [
                    {
                        id: result.equipments[0].equipment_id,
                        equipment: {
                            id: "652cea79-e9ba-4fbe-8c9f-b10b65ba1be4",
                            name: "asdfasdf 5"
                        },
                        equipment_id: db.collection("equipments").doc("652cea79-e9ba-4fbe-8c9f-b10b65ba1be4"),
                        quantity: 100,
                        price_item: 10000000,
                        total_price: 100 * 10000000
                    },
                    {
                        id: result.equipments[1].equipment_id,
                        equipment: {
                            id: "63836b69-01a9-42b0-9ee9-3c1e456c1b46",
                            name: "asdfasdf 6"
                        },
                        equipment_id: db.collection("equipments").doc("63836b69-01a9-42b0-9ee9-3c1e456c1b46"),
                        quantity: 100,
                        price_item: 10000000,
                        total_price: 100 * 10000000
                    },
                ],
                deleted: [

                ]
            },
            assets: {
                added: [

                ],
                updated: [

                ],
                deleted: [
                    result.assets[0].asset_id,
                    result.assets[1].asset_id
                ]
            },
            shoot: {
                id: result.shoot.shoot_id,
                test: "zxcv zxcv",
                status: "paid"
            }
        }
        const req = {
            header(h){
                return {
                    'Authorization': 'Bearer ASDFasdfZXCVzxcvQWERqwer'
                }[h] || {}
            },
            body: {
                message: {
                    data
                }
            }
        }
        await editShoot(req, res)
        beforeAfter.push(db.store.state.clone())
        console.log(JSON.stringify(beforeAfter, null, 2))
    })
})