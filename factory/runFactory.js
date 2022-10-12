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

const dep = new Map()
dep.set(UserFactory, [])
dep.set(ContractTemplateFactory, [])
dep.set(ProcedureTypeFactory, [])
dep.set(AssetFactory, [UserFactory])
dep.set(ContractFactory, [UserFactory])
dep.set(OrderFactory, [UserFactory, ShootFactory])
dep.set(AssetContractFactory, [AssetFactory, ContractFactory])
dep.set(ContractVersionFactory, [UserFactory, ContractFactory])
dep.set(OrderVersionFactory, [UserFactory, OrderFactory])
dep.set(SubmissionFormFactory, [UserFactory, AssetFactory])
dep.set(PaymentFactory, [UserFactory, OrderFactory, ShootFactory, ContractFactory])
dep.set(ShootFactory, [AssetFactory, UserFactory, ProcedureTypeFactory])

module.exports = async () => {
    const users = await UserFactory.createDocs(50)
    const contract_templates = await ContractTemplateFactory.createDocs(10)
    const procedure_types = await ProcedureTypeFactory.createDocs(10)
    const assets = await AssetFactory.createDocs(10)

    const submission_forms = []
    for (let l = 0; l < assets.length; l++) {
        const submissionForm = new SubmissionFormFactory()
        await submissionForm.createDoc(assets[l].ref)
        submission_forms.push(submissionForm)
    }

    const contracts = await ContractFactory.createDocs(10)
    const contract_versions = {}
    for(let k = 0; k < contracts.length; k++){
        const person = contracts[k].subjects[Math.round(Math.random())]
        const pkey = users.find(v => v.id == person.id).encryptedPrivateKey
        contract_versions[contracts[k].id] = await contracts[k].createSubDocs(5, person.id, pkey)
    }

    const shoots = await ShootFactory.createDocs(10)

    const orders = await OrderFactory.createDocs(10)
    const order_versions = {}
    for (let i = 0; i < orders.length; i++) {
        const person = orders[i].subjects[Math.round(Math.random())]
        const pkey = users.find(v => v.id == person.id).encryptedPrivateKey
        order_versions[orders[i].id] = await orders[i].createSubDocs(5, person.id, pkey, shoots[Math.floor(Math.random() * shoots.length)].ref)
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
    for (let j = 0; j < 10; j++) {
        const payment = new PaymentFactory()
        const randomUser1 = users[Math.round(Math.random() * users.length)]
        const randomUser2 = users[Math.round(Math.random() * users.length)]
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