const { runFactory } = require('./runFactory')

const main = async () => {
    return runFactory().then(() => {
        console.log('factory runner finished!')
        process.exit(0)
    }).catch(console.error)
}

main()