const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Posts
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});

// Update Post
// router.patch("/:id", (req, res, next) => {
//   const id = req.params.id;
//   const updateOps = {};

//   const posts = loadPostsCollection();

//   for (const ops of req.body){
//     updateOps[ops.propName] = ops.value;
//   }
//   posts.update({_id: id}, { $set: updateOps })
//   .exec()
//   .then(result => {
//     console.log(result);
//     res.status(200).json(result);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     });
//   });

// });


// Update Task ---------------------------
// router.put('/:id', (req, res, next) => {
//   const posts = loadPostsCollection();

//   if (!req.body.text) {
//     res.status(400)
//     res.json({
//       error: 'Bad Data'
//     })
//   } else {
//     posts.update(
//       { text: req.body.text },
//       { where: {_id: new mongodb.ObjectID(req.params.id)} }
//     )
//       .then(() => {
//         res.send('Post Updated!')
//       })
//       .error(err => handleError(err))
//   }
// })

// router.route('/:id').put((req, res) => {
//   const posts = loadPostsCollection();

//   posts.findById(req.params.id, (err, post) => {
//     if (!post)
//       return next(new Error('Error getting the post!'));
//     else {
//       post.text = req.body.name;
//       post.save().then( post => {
//           res.json('post updated successfully');
//       })
//       .catch(err => {
//             res.status(400).send("Error when updating the post");
//       });
//     }
//   });
// });






async function loadPostsCollection(){
  const client  = await mongodb.MongoClient.connect('mongodb://localhost:27017',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return client.db('CrudDB').collection('posts');
}



module.exports = router;
