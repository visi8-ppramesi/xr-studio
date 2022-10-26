const { buildMappedCollections, resetCollections } = require('./runFactory')
const argv = require('minimist')(process.argv.slice(2));

const main = async () => {
    if(argv.reset){
        try{
            await resetCollections()
            console.log('collections reset')
        }catch(err){
            console.error(err)
        }
    }
    if(argv.build){
        try{
            await buildMappedCollections()
            console.log('collections build')
        }catch(err){
            console.error(err)
        }
    }
    process.exit(0)
}

main()