// Mock database for server testing

module.exports.users = [

    {
        email: 'student@photoboard.com',
        password: '$2b$10$.3t/.DM3NbKu8Cl0I88l2eorrhxaVoXzimo8BoccjO9Cc7c4lXvge', // student
        firstName: 'Jason',
        lastName: 'Gerardi',
        classes: [
            '12345'
        ],
    },

    {
        email: 'admin@photoboard.com',
        password: '$2b$10$toyWfmoC7iY.WC/eMSwhwelm4J415oHowDwUBza3rOfJ0zh7vFrJi', // admin
        firstName: 'Tristan',
        lastName: 'Copley',
        classes: [
            'admin',
            '12345'
        ]
    },


]

module.exports.classes = [

    {
        image: 'IMAGE_DATA_HERE',
        code: '12345',
        students: [

            'student@photoboard.com',

        ],
        admins: [

            'admin@photoboard.com',

        ],
        assignments: [],
        messages: [

            {
                id: '0',
                text: 'First announcement. ',
                attachments: {

                    embedded: [

                        {
                            id: '2',
                            src: 'IMAGE_DATA_HERE'
                        },

                    ],

                    external: [

                        {
                            id: '1',
                            url: 'https://imgs.search.brave.com/e2GbDIg7b0b_36yuc-0q3AlpRNpdLLEbeW_028EQK04/rs:fit:632:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5K/d2xzVlE0ZFBsR2RV/dV9XUDVUZnJRSGFG/aiZwaWQ9QXBp',
                        }

                    ]

                }

            }

        ],

        channel: [

            {
                type: 'message',
                id: '0'

            }

        ]

        // Channel contains pointers to assignment and messages list. This way channel can record the true order of all messages
        // and we can store everything is the other lists. We can then add links in different parts of the websit with assignment/:assignment

    }

]
