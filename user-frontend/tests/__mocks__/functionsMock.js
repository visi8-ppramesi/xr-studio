import { v4 } from 'uuid'
import store from './storeMock.js'

const createDummyComicOrder = (data, paymentType) => {
    const { userId } = data.customerDetails;
    const { grossAmount, tax, fee } = data.transactionDetails;
    const itemsDetails = data.itemsDetails;
    const orderId = v4()
    const items = itemsDetails.map((itemDetail) => {
        const { comicId, comicName, itemPrice } = itemDetail;
        return {
            name: comicName,
            description: comicName,
            type: "comic",
            reference: ["comics", comicId],
            price: itemPrice,
        };
    });
    return store.setState(["users", userId, "orders", orderId], {
        status: 'closed',
        order_id: orderId,
        total_amount: grossAmount,
        created_date: new Date(),
        tax, fee,
        items: items,
        charge_response: {
            actions: [{ name: 'generate-qr-code', url: "https://google.com" }],
            payment_type: paymentType
        },
    });
}

const createDummyChapterOrder = (data, paymentType) => {
    const { userId } = data.customerDetails;
    const { grossAmount, tax, fee } = data.transactionDetails;
    const itemsDetails = data.itemsDetails;
    const orderId = v4()
    const items = itemsDetails.map((itemDetail) => {
        const { chapterId, comicId, chapterNum, comicName, itemPrice } = itemDetail;
        return {
            name: comicName + ":" + chapterNum,
            description: comicName + ", chapter " + chapterNum,
            type: "chapter",
            reference: ["comics", comicId, "chapters", chapterId],
            price: itemPrice,
        };
    });
    return store.setState(["users", userId, "orders", orderId], {
        status: 'closed',
        order_id: orderId,
        total_amount: grossAmount,
        created_date: new Date(),
        tax, fee,
        items: items,
        charge_response: {
            actions: [{ name: 'generate-qr-code', url: "https://google.com" }],
            payment_type: paymentType
        },
    });
};

const functions = {
    async 'fetchChapterResourcesSignedUrl-fetchChapterResourcesSignedUrl'(param){
        return {
            data: {
                'page-1': 'https://signed-url.com/stuff.jpg',
                'page-2': 'https://signed-url.com/stuff.jpg',
                'page-3': 'https://signed-url.com/stuff.jpg',
                'page-4': 'https://signed-url.com/stuff.jpg',
            }
        }
    },
    'createComicCreditCardCharge-createComicCreditCardCharge'(param) {
        console.log('createComicCreditCardCharge-createComicCreditCardCharge')
        const paymentType = 'credit_card';
        createDummyComicOrder(param, paymentType)
        return {
            data: {
                chargeResponse: {
                    actions: [{ name: 'generate-qr-code', url: "https://google.com" }],
                    payment_type: paymentType
                }
            }
        }
    },
    'createComicGopayCharge-createComicGopayCharge'(param) {
        const paymentType = 'credit_card';
        createDummyChapterOrder(param, paymentType)
        return {
            data: {
                chargeResponse: {
                    actions: [{ name: 'generate-qr-code', url: "https://google.com" }],
                    payment_type: paymentType
                }
            }
        }
    },
    'createChapterCreditCardCharge-createChapterCreditCardCharge'(param) {
        console.log('createChapterCreditCardCharge-createChapterCreditCardCharge')
        const paymentType = 'gopay';
        createDummyComicOrder(param, paymentType)
        return {
            data: {
                chargeResponse: {
                    actions: [{ name: 'generate-qr-code', url: "https://google.com" }],
                    payment_type: paymentType
                }
            }
        }
    },
    'createChapterGopayCharge-createChapterGopayCharge'(param) {
        const paymentType = 'gopay';
        createDummyChapterOrder(param, paymentType)
        return {
            data: {
                chargeResponse: {
                    actions: [{ name: 'generate-qr-code', url: "https://google.com" }],
                    payment_type: paymentType
                }
            }
        }
    },
}

export const getFunctions = jest.fn();
export const httpsCallable = jest.fn((funcInstance, funcName) => {
    return functions[funcName]
});