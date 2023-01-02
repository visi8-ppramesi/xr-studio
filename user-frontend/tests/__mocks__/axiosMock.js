export default {
    async get(url){
        switch(url){
            case 'https://ipinfo.io/?token=a885dadad494bc':
                return {
                    data: { country: 'ID' }
                }
            default:
                return {
                    data: url
                }
        }
    }
}