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
        const equipmentProjection = await equipment.getRandomProjection()
        const equipmentId = equipmentProjection.id
        return {
            equipment: equipmentProjection,
            equipment_id: equipmentId,
            price: Math.round(Math.random() * 100) * 100
        }
    }
}