import Post from '../models/post_model';


export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.coverUrl = req.body.coverUrl;
  post.save()
    .then((result) => {
      res.json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

//   res.send('post should be created and returned');
};
export const getPosts = (req, res) => {
  Post.find().exec((err, posts) => {
    res.send(posts);
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    res.send(post);
  });
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }).exec((err, post) => {
    if (err) {
      res.send(err);
    }
    res.send({ message: 'post deleted' });
  });
};
export const updatePost = (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    post.title = req.body.title;
    post.tags = req.body.tags;
    post.content = req.body.content;
    post.coverUrl = req.body.coverUrl;

    post.save()
      .then(res.send(post))
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
};
