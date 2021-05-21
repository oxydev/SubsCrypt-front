//define the reducer function of the project
/*
state structure :

state : {
    user: {
        id: ...,
        type: ...,
        name: ...,
        decription: ...,
        wallet: ...,
        network: ...
    },
    wallet : {
        id: ...,
        name: ...,
        logo: ...,
        credit: ...
    }
    definedPlans: [
        {
            id: ...,
            name: ...,
            provider: ...,
            duration:
            refundPolicy: ...,
            useAmmount: ...,
            tags: [tag1,tag2,tag3,..]
            payMethos: [
                {
                    coin1: ...,
                    logo: ...
                },
                {
                    coin1: ...,
                    logo: ...
                },
                ...
            ]
        },
        ...
    ],
    activePlans: [
        {
            id: ...,
            name: ...,
            provider: ...,
            activationDate: ...,
            expireDate: ... ,
            duration:
            refundPolicy: ...,
            useAmmount: ...,
            payMethods: [
                {
                    coin1: ...,
                    logo: ...
                },
                {
                    coin1: ...,
                    logo: ...
                },
                ...
            ]
        }
    ],

}
*/
