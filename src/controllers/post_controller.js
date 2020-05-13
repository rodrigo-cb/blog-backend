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
    if (err) {
      res.status(500).json({ err });
    }
    res.json(posts);
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    res.json(post);
  });
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }).exec((err, post) => {
    if (err) {
      res.status(500).json({ err });
    }
    res.json({ message: 'post deleted' });
  });
};
export const updatePost = (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    if (err) {
      res.status(500).json({ err });
    }
    post.title = req.body.title;
    post.tags = req.body.tags;
    post.content = req.body.content;
    post.coverUrl = req.body.coverUrl;

    post.save()
      .then(res.json(post))
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
};
