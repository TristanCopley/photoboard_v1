module.exports = () => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://tristan:MxkY5Rh1wyzL1nys@cluster0.s8gtq.mongodb.net/userdata?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {

        if (err) return console.error(err);
        console.log('Connected to Database');

        const db = client.db("userdata");

        db.collection('accounts').find({ email: 'admin@photoboard.com'}, {}).toArray().then((docs) => {

            console.log(docs);

        }).catch((err) => {

            console.log(err);

        })

    });
}