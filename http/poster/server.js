const Butter = require('../butter-framework');

const USERS = [
  {
    id: 1,
    name: 'Liam Brown',
    username: 'liam23',
    password: 'string',
  },
  {
    id: 2,
    name: 'Meredith Green',
    username: 'merit.sky',
    password: 'string',
  },
  {
    id: 3,
    name: 'Ben Adams',
    username: 'ben.poet',
    password: 'string',
  },
];

const POSTS = [
  {
    id: 1,
    title: 'This is a post title',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor earum natus doloremque, at consequuntur doloribus facere eos! Minima consequatur quidem officia, esse iusto recusandae velit voluptatibus modi corporis totam soluta facere hic, labore ipsam dolorum quos excepturi accusamus! Ipsum dolor ratione quos dicta, quo, molestias quod corrupti dolorem sapiente cumque blanditiis unde. Eos sed temporibus dicta aperiam. Soluta, ipsum! Blanditiis dicta, tenetur a laudantium aliquid repellat dolorum odio enim consectetur facilis repellendus cupiditate quos, quidem labore repudiandae adipisci tempore nesciunt perspiciatis. Vel impedit iusto, ducimus minus soluta quisquam quis beatae architecto dignissimos obcaecati a dolorem voluptas corrupti eius quidem optio.',
    userId: 1,
  },
];

const PORT = 8000;

const server = new Butter();

// ----- Files Routes -----
server.route('get', '/', (req, res) => {
  res.sendFile('./public/index.html', 'text/html');
});

server.route('get', '/styles.css', (req, res) => {
  res.sendFile('./public/styles.css', 'text/css');
});

server.route('get', '/scripts.js', (req, res) => {
  res.sendFile('./public/scripts.js', 'text/javascript');
});

// ----- json Routes -----
server.route('get', '/api/posts', (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);
    post.author = user.name;
    return post;
  });

  res.status(200).json(posts);
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
