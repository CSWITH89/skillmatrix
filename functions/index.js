const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello World");
});

exports.getSkills = functions.https.onRequest((req, res) => {
    admin
    .firestore()
    .collection('skills')
    .get()
    .then((data) => {
            let skills = [];
            data.forEach((doc) => {
                skills.push(doc.data());
            });
            return res.json(skills);
        })
        .catch((err) => console.error(err));
});

exports.createSkills = functions.https.onRequest((req, res) => {
    
    const newSkill = {
        skillName: req.body.skillName,
        skillValue: req.body.skillValue,
        username: req.body.username,
        createdOn: admin.firestore.Timestamp.fromDate(new Date()),
    };

    admin.firestore('skills')
    .collection
    .add(newSkill)
    .then(doc =>{

        res.json({ message: `document ${doc.id} created successfully`});

    })
    .catch(err => {
        res.status(500).json({error:'something went wrong'});
        console.error(err);
    });
});