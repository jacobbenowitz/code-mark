const mongoose = require('mongoose');
const User = require('./models/User');
const Note = require('./models/Note');
const Comment = require('./models/Comment');
const db = require('./config/keys').mongoURI;

const bcrypt = require('bcryptjs');

// const {getResources} = require('./frontend/src/actions/webscrap_actions');
// const {getStuff} = require('./frontend/src/util/webscrap_util');

// mongoose
//     .connect(db, {useNewUrlParser: true})
//     .then(() => console.log('Connected to MongoDB successfully'))
//     .catch(err => console.log(err));

function makePasswordHash(password){
    const salt = bcrypt.genSaltSync(10)
    const encrypted = bcrypt.hashSync(password, salt)
    return encrypted;
}

// var testpassword = makePasswordHash('password');
// console.log(testpassword);
// console.log(bcrypt.compareSync("password", testpassword))

let seedUsers = [
    {
        username: 'demo',
        email: 'demo@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo1',
        email: 'demo1@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    }
    // ,
    // {
    //     username: 'demo2',
    //     email: 'demo2@email.com',
    //     password: makePasswordHash('password'),
    //     notes: [],
    //     comments: []
    // },
    // {
    //     username: 'demo3',
    //     email: 'demo3@email.com',
    //     password: makePasswordHash('password'),
    //     notes: [],
    //     comments: []
    // },
    // {
    //     username: 'demo4',
    //     email: 'demo4@email.com',
    //     password: makePasswordHash('password'),
    //     notes: [],
    //     comments: []
    // },
    // {
    //     username: 'demo5',
    //     email: 'demo5@email.com',
    //     password: makePasswordHash('password'),
    //     notes: [],
    //     comments: []
    // },
    // {
    //     username: 'demo6',
    //     email: 'demo6@email.com',
    //     password: makePasswordHash('password'),
    //     notes: [],
    //     comments: []
    // },
    // {
    //     username: 'demo7',
    //     email: 'demo7@email.com',
    //     password: makePasswordHash('password'),
    //     notes: [],
    //     comments: []
    // },
    // {
    //     username: 'demo8',
    //     email: 'demo8@email.com',
    //     password: makePasswordHash('password'),
    //     notes: [],
    //     comments: []
    // },
    // {
    //     username: 'demo9',
    //     email: 'demo9@email.com',
    //     password: makePasswordHash('password'),
    //     notes: [],
    //     comments: []
    // }
]

// let seedNotes = [
//     {
//         user: "demo",
//         title: "demo's first note",
//         codebody: "const addCurry = (a) => {\nreturn (b) => {\nreturn (c) => {\nreturn a + b + c\n}\n}\n}\nconsole.log(addCurry(2)(3)(5)) \/\/ 10",
//         textdetails: "whatever",
//         tags: ['curry','console.log'],
//         resources: [
//             {
//                 link: '',
//                 title: ''
//             },
//             {
//                 link: '',
//                 title: ''
//             },
//             {
//                 link: '',
//                 title: ''
//             }
//         ]
//     }
// ]

let seedNotes =
[
    {
        title: "keys",
        codebody: "let veggies = \"\";\nfor(const x of fruits.keys()) {\nveggies += x;\n}",
        textdetails: "List all keys",
        tags: ["Javascript", "random"],
        resources: [
                {
                    link: "https://www.w3schools.com/js/js_object_maps.asp",
                    title: "JavaScript Maps"
                },
                {
                    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys",
                    title: "Object.keys()"
                },
                {
                    link: "https://stackoverflow.com/questions/8763125/get-array-of-objects-keys",
                    title: "Get array of object’s keys - javascript - Stack Overflow"
                }
        ]
    },
    {
        title: "keys",
        codebody: "Math.random()",
        textdetails: "will always be a number less than 1 ",
        tags: ["Javascript", "random"],
        resources: [
                {
                    link: "https://www.w3schools.com/js/js_object_maps.asp",
                    title: "js object maps"
                },
                {
                    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random",
                    title: "Math.random()"
                },
                {
                    link: "https://www.geeksforgeeks.org/javascript-math-random-method",
                    title: "JavaScript Math random() Method - GeeksforGeeks"
                }
        ]
    },
    {
        title: "AJAX - XMLHttpRequest ",
        codebody: "xhttp.open(\"\GET\"\, \"\ajax_info.txt\"\, false);\nxhttp.send();\ndocument.getElementById(\"\demo\"\).innerHTML = xhttp.responseText;",
        textdetails: "Sometimes async = false are used for quick testing. You will also find synchronous requests in older JavaScript code.",
        tags: ["Javascript", "AJAX"],
        resources: [
                {
                    link: "https://www.w3schools.com/js/js_ajax_http_send.asp",
                    title: "Synchronous Request"
                },
                {
                    link: "https://www.tutorialspoint.com/ajax/what_is_xmlhttprequest.htm",
                    title: "AJAX - XMLHttpRequest"
                }
        ]
    }
]

// function makeNotes(notes){
//     notes.forEach(async note => {
//         const {user,title,codebody,textdetails,tags} = note;
//         //need to get resources, then get user and make note
//         // resources = await getStuff(resource_words,codebody);
//         // const links = resources.map(obj => obj.link)
//         // const unique_links = resources.filter(({link},idx) => !links.includes(link, idx+1))
//         User.find({username:user})
//         .then(founduser => {
//             seedNotes.push({
//                 codebody: codebody,
//                 user: founduser.id,
//                 title: title,
//                 textdetails: textdetails,
//                 resources: [],
//                 tags: tags
//             });
//             // newNote.save()
//             // .then(note => {
//             //     founduser.notes.push(newNote.id)
//             //     founduser.save()
//             // })
//         })
//     })
// }

const seed = async (users,notes) => {
    const note_ids = [];
    const user_ids = [];
    users.forEach((user,idx) => {
        const newUser = new User({
            username: user.username,
            email: user.email,
            password: user.password,
            notes: [],
            comments: []
        })
        newUser.save()
            .then(() => user_ids.push(newUser.id))
    })
    // const user_ids = await User.insertMany(users).insertedIds
    notes.forEach((note,idx) => {
        const newNote = new Note({
            codebody: note.codebody,
            title: note.title,
            user: user_ids[idx % user_ids.length],
            textdetails: note.textdetails,
            resources: note.resources,
            comments: []
        })
        newNote.save()
            .then(() => {
                User.findById(newNote.user)
                    .then(user => {
                        user.notes.push(newNote.id)
                        user.save()
                    })
                note_ids.push(newNote.id)
            })
            .then(() => {
                
            })
    })
    // Comment.find()
    //     .then(() => {
    //         console.log("Going to close connection");
    //         mongoose.connection.close()
    // })
    // comments.forEach((comment,idx) => {
    //     const user_id = user_ids[idx % user_ids.length]
    //     var note_id;
    //     Note.find({title: comment.note_title})
    //         .then(note => note_id = note.id)
    //     const newComment = new Comment({
    //         user: user_id,
    //         note: note_id,
    //         textbody: comment.textbody,
    //         codeSnippet: comment.codeSnippet
    //     })
    //     newComment.save()
    //     .then(() => {
    //         Note.findById(newComment.note)
    //             .then(note => {
    //                 note.comments.push(newComment.id)
    //                 note.save()
    //             })
    //     })
    //     .then(() => {
    //         User.findById(user_id)
    //             .then(user => {
    //                 user.comments.push(newComment.id)
    //                 user.save()
    //             })
    //     })
    // })
}

// seed(seedUsers,seedNotes);
const connectToMongo = async () => {
    await mongoose
        .connect(db, {useNewUrlParser: true})
        .then(() => console.log('Connected to MongoDB successfully'))
        .catch(err => console.log(err));
    return mongoose;
};



const seedDB = async () => {
    await connectToMongo();
    // await User.deleteMany();
    // await Note.deleteMany();
    // await Comment.deleteMany();
    await seed(seedUsers,seedNotes);
};

seedDB().then(() => {
    console.log("Going to close connection");
    mongoose.connection.close();
});

