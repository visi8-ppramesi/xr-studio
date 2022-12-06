const EquipmentFactory = require('../../equipments/equipments')
const Factory = require('../../factory')

module.exports = class ShootEquipmentFactory extends Factory{
    static collectionName = 'equipments'
    constructor(parent){
        super()
        this.setCollectionPath([...parent, this.constructor.collectionName])
    }

    static async createData(){
        const equipment = new EquipmentFactory()
        const equipmentProjection = await equipment.getRandomProjection(['id', 'name'])
        const equipmentId = equipmentProjection.id
        const numA = 1 + Math.floor(Math.random() * 10)
        const numB = Math.round(Math.random() * 10_000) * 100
        return {
            equipment: equipmentProjection,
            equipment_id: equipmentId,
            quantity: numA,
            price_item: numB,
            total_price: numA * numB
        }
    }
}