const AssetContractFactory = require("./collections/asset-contracts/assetContracts")
const AssetFactory = require("./collections/assets/assets")
const ContractTemplateFactory = require("./collections/contract-templates/contractTemplates")
const ContractFactory = require("./collections/contracts/contracts")
const ContractVersionFactory = require("./collections/contracts/contract-versions/contractVersions")
const OrderFactory = require("./collections/orders/orders")
const OrderVersionFactory = require("./collections/orders/order-versions/orderVersions")
const PaymentFactory = require("./collections/payments/payments")
const ProcedureTypeFactory = require("./collections/procedure-types/procedureTypes")
const ShootFactory = require("./collections/shoots/shoots")
const SubmissionFormFactory = require("./collections/submission-forms/submissionForms")
const UserFactory = require("./collections/users/users")
const _ = require('lodash')

const factoryMap = new Map()
factoryMap.set(UserFactory, {
    dep: [],
    buildFunc: ['createDocs', 10],
})
factoryMap.set(ContractTemplateFactory, {
    dep: [],
    buildFunc: ['createDocs', 5],
})
factoryMap.set(ProcedureTypeFactory, {
    dep: [],
    buildFunc: ['createDocs', 5],
})
factoryMap.set(AssetFactory, {
    dep: [UserFactory],
    buildFunc: ['createDocs', 5],
})
factoryMap.set(SubmissionFormFactory, {
    dep: [UserFactory, AssetFactory],
    buildFunc: async (context) => {
        const submissionForms = []
        const assets = context.get(AssetFactory).passValue
        for(let i = 0; i < 5; i++){
            const submissionForm = new SubmissionFormFactory()
            await submissionForm.createDoc(assets[l].ref)
            submissionForms.push(submissionForm)
        }
        return submissionForms
    },
})
factoryMap.set(ContractFactory, {
    dep: [UserFactory],
    buildFunc: ['createDocs', 5]
})
factoryMap.set(ContractVersionFactory, {
    dep: [UserFactory, ContractFactory],
    buildFunc: async (context) => {
        const contracts = context.get(ContractFactory).passValue
        const contractVersions = {}
        for(let k = 0; k < contracts.length; k++){
            const person = contracts[k].subjects[Math.round(Math.random())]
            const pkey = users.find(v => v.id == person.id).encryptedPrivateKey
            contractVersions[contracts[k].id] = await contracts[k].createSubDocs(5, person.id, pkey)
        }
        return contractVersions
    }
})
factoryMap.set(AssetContractFactory, {
    dep: [AssetFactory, ContractFactory],
    buildFunc: async (context) => {
        const assets = context.get(AssetFactory).passValue
        const contracts = context.get(ContractFactory).passValue
        const shuffledAssets = _.shuffle(assets)
        const shuffledContracts = _.shuffle(contracts)

        const retVal = await Promise.all(shuffledAssets.map((ass, idx) => {
            const acFactory = new AssetContractFactory()
            return acFactory.createDoc(ass.id, shuffledContracts[idx].ref).then(v => {
                return acFactory
            })
        }))
        return retVal
    }
})
factoryMap.set(OrderFactory, {
    dep: [UserFactory, ShootFactory],
    buildFunc: ['createDocs', 5]
})
factoryMap.set(OrderVersionFactory, {
    dep: [UserFactory, OrderFactory],
    buildFunc: async (context) => {
        const orders = context.get(OrderFactory).passValue
        const orderVersions = {}
        for (let i = 0; i < orders.length; i++) {
            const person = orders[i].subjects[Math.round(Math.random())]
            const pkey = users.find(v => v.id == person.id).encryptedPrivateKey
            orderVersions[orders[i].id] = await orders[i].createSubDocs(5, person.id, pkey)
        }
        return orderVersions
    }
})
factoryMap.set(ShootFactory, {
    dep: [AssetFactory, UserFactory, ProcedureTypeFactory],
    buildFunc: async (context) => {
        const orders = context.get(OrderFactory).passValue
        const shoots = []
        for (let i = 0; i < orders.length; i++) {
            const shoot = new ShootFactory()
            shoot.createDoc(orders[i].ref)
            shoots.push(shoot)
        }
        return shoots
    }
})
factoryMap.set(PaymentFactory, {
    dep: [UserFactory, OrderFactory, ShootFactory, ContractFactory],
    buildFunc: async (context) => {
        const users = context.get(UserFactory).passValue
        const payments = []
        for (let j = 0; j < 5; j++) {
            const payment = new PaymentFactory()
            const randomUser1 = users[Math.floor(Math.random() * users.length)]
            const randomUser2 = users[Math.floor(Math.random() * users.length)]
            const randomContract = contracts[Math.floor(Math.random() * contracts.length)]
            payment.createDoc(randomUser1.ref, randomUser2.ref, null, 'paid', randomContract.ref, randomUser1.encryptedPrivateKey)
            payments.push(payment)
        }
        return payments
    }
})

const runFactoryFromMap = async (factMap, context = null) => {
    if(_.isNil(context)){
        context = new Map()
    }
    for(const fact of factMap.keys()){
        let result
        const { dep, buildFunc } = factMap.get(fact)
        const depCheck = dep.reduce((acc, v) => {
            return acc && context.has(v)
        }, true)
        if(_.isNil(dep) || dep.length == 0 || depCheck){
            if(_.isArray(buildFunc)){
                const func = buildFunc.shift()
                if(fact[func][Symbol.toStringTag] === 'AsyncFunction'){
                    result = await fact[func](...buildFunc)
                }else{
                    result = fact[func](...buildFunc)
                }
            }else if(_.isFunction(buildFunc)){
                if(buildFunc[Symbol.toStringTag] === 'AsyncFunction'){
                    result = await buildFunc(context)
                }else{
                    result = buildFunc(context)
                }
            }
            context.set(fact, {
                passValue: result
            })
            factMap.delete(fact)
        }
    }
    if(factMap.size > 0){
        await runFactoryFromMap(factMap, context)
    }
    return context
}

const resetCollections = async () => {
    const factories = [UserFactory, ContractTemplateFactory, ProcedureTypeFactory, AssetFactory, AssetContractFactory,
    ContractFactory, OrderFactory, SubmissionFormFactory, PaymentFactory, ShootFactory]
    const clearPromises = factories.map(factory => {
        const fact = new factory()
        return fact.clearCollections()
    })
    return Promise.all(clearPromises)
}

const buildMappedCollections = async () => {
    const resultingContext = runFactoryFromMap(factoryMap)
    return resultingContext
}

const buildCollections = async () => {
    const users = await UserFactory.createDocs(10)
    const contract_templates = await ContractTemplateFactory.createDocs(5)
    const procedure_types = await ProcedureTypeFactory.createDocs(5)
    const assets = await AssetFactory.createDocs(5)

    const submission_forms = []
    for (let l = 0; l < assets.length; l++) {
        console.log('creating submission_form')
        const submissionForm = new SubmissionFormFactory()
        await submissionForm.createDoc(assets[l].ref)
        submission_forms.push(submissionForm)
        console.log('submission_form created')
    }

    const contracts = await ContractFactory.createDocs(5)
    const contract_versions = {}
    for(let k = 0; k < contracts.length; k++){
        const person = contracts[k].subjects[Math.round(Math.random())]
        const pkey = users.find(v => v.id == person.id).encryptedPrivateKey
        contract_versions[contracts[k].id] = await contracts[k].createSubDocs(5, person.id, pkey)
    }

    const orders = await OrderFactory.createDocs(5)
    const order_versions = {}
    const shoots = []
    for (let i = 0; i < orders.length; i++) {
        const person = orders[i].subjects[Math.round(Math.random())]
        const pkey = users.find(v => v.id == person.id).encryptedPrivateKey
        order_versions[orders[i].id] = await orders[i].createSubDocs(5, person.id, pkey)
        const shoot = new ShootFactory()
        shoot.createDoc(orders[i].ref)
        shoots.push(shoot)
    }

    const shuffledAssets = _.shuffle(assets)
    const shuffledContracts = _.shuffle(contracts)

    const assets_contracts = await shuffledAssets.map((ass, idx) => {
        const acFactory = new AssetContractFactory()
        return acFactory.createDoc(ass.id, shuffledContracts[idx].ref).then(v => {
            return acFactory
        })
    })

    const payments = []
    for (let j = 0; j < 5; j++) {
        const payment = new PaymentFactory()
        const randomUser1 = users[Math.floor(Math.random() * users.length)]
        const randomUser2 = users[Math.floor(Math.random() * users.length)]
        const randomContract = contracts[Math.floor(Math.random() * contracts.length)]
        payment.createDoc(randomUser1.ref, randomUser2.ref, null, 'paid', randomContract.ref, randomUser1.encryptedPrivateKey)
        payments.push(payment)
    }

    return {
        dependencies: dep,
        users, contract_templates, procedure_types, assets, submission_forms,
        contracts, contract_versions, shoots, orders, order_versions,
        assets_contracts, payments
    }
}

// exports.runFactory = async () => {
//     await resetCollections().then(buildCollections)
// }

exports.resetCollections = resetCollections
exports.buildCollections = buildCollections
exports.buildMappedCollections = buildMappedCollections