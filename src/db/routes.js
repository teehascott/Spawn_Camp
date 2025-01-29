const express = require("express");
const ViteExpress = require("vite-express");
const asyncHandler = require("express-async-handler");
// const prisma = require('@prisma/client').PrismaClient;
// const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

//   // Get user by ID and username
//   app.get('/api/users/:username/:id', asyncHandler(async (req, res) => {
//     const { username, id } = req.params;
//     const user = await prisma.user.findFirst({
//       where: {
//         id: parseInt(id),
//         username: username,
//       },
//     });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).send('User not found');
//     }
//   }));

//   // Create new user
//   app.post('/api/users', asyncHandler(async (req, res) => {
//     const { username, email, password, bio, avatar } = req.body;
//     const newUser = await prisma.user.create({
//       data: { username, email, password, bio, avatar },
//     });
//     res.status(201).json(newUser);
//   }));

//   // Update user
//   app.put('/api/users/:id', asyncHandler(async (req, res) => {
//     const { username, email, password, bio, avatar } = req.body;
//     const updatedUser = await prisma.user.update({
//       where: { id: parseInt(req.params.id) },
//       data: { username, email, password, bio, avatar },
//     });
//     res.json(updatedUser);
//   }));

//   // Delete user
//   app.delete('/api/users/:id', asyncHandler(async (req, res) => {
//     await prisma.user.delete({
//       where: { id: parseInt(req.params.id) },
//     });
//     res.status(204).send();
//   }));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Internal Server Error');
// });

// // Start the Express server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

// Get user by ID and username
router.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const { username, id } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
        username: username,
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  })
);

// Create new user
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, email, password, bio, avatar } = req.body;
    const newUser = await prisma.user.create({
      data: { username, email, password, bio, avatar },
    });
    res.status(201).json(newUser);
  })
);

// Update user
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { username, email, password, bio, avatar } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { username, email, password, bio, avatar },
    });
    res.json(updatedUser);
  })
);

// Delete user
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  })
);

// Add Bookmark
router.post(
  "/bookmarks",
  asyncHandler(async (req, res) => {
    const { userId, gameId } = req.body;

    try {
      const bookmark = await prisma.bookmark.create({
        data: { userId, gameId },
      });
      res.status(201).json(bookmark);
    } catch (error) {
      res.status(500).json({ error: "Error creating bookmark" });
      console.log(error);
    }
  })
);

// Delete Bookmark
router.delete(
  "/user/:userId/bookmarks/:gameId",
  asyncHandler(async (req, res) => {
    const { userId, gameId } = req.params;

    try {
      await prisma.bookmark.delete({
        where: {
          userId_gameId: { userId: parseInt(userId), gameId: parseInt(gameId) },
        },
      });
      res.status(200).json({ message: "Bookmark deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting bookmark" });
      console.log(error);
    }
  })
);

// Get Bookmarks
router.get(
  "/user/:userId/bookmarks/:gameId",
  asyncHandler(async (req, res) => {
    const { userId, gameId } = req.params;
    const bookmark = await prisma.bookmark.findFirst({
      where: { userId: parseInt(userId), gameId: parseInt(gameId) },
    });

    res.status(200).json(!!bookmark);
  })
);

// Add a comment
router.post(
  "/comments",
  asyncHandler(async (req, res) => {
    const { gameId, discId, userId, profileId, content } = req.body;

    try {
      const comment = gameId;
      if (gameId) {
        await prisma.gameComment.create({
          data: { gameId, userId, content },
        });
      } else if (discId) {
        await prisma.discComment.create({
          data: { discId, userId, content },
        });
      } else {
        await prisma.profileComment.create({
          data: { profileId, userId, content },
        });
      }

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Error creating comment" });
      console.log(error);
    }
  })
);

// Get Game Comments
router.get(
  "/game/:id/comments",
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id);
    try {
      const comments = await prisma.gameComment.findMany({
        where: { gameId },
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Error loading game comments" });
      console.log(error);
    }
  })
);

// Get Discussion Comments
router.get(
  "/disc/:id/comments",
  asyncHandler(async (req, res) => {
    const discId = parseInt(req.params.id);
    try {
      const comments = await prisma.discComment.findMany({
        where: { discId },
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Error loading discussion comments" });
      console.log(error);
    }
  })
);

// Get Profile Comments
router.get(
  "/user/:id/comments",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
      const comments = await prisma.profileComment.findMany({
        where: { userId },
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Error loading profile comments" });
      console.log(error);
    }
  })
);

// Update a comment
router.put(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content, type } = req.body;

    try {
      const updatedComment =
        type === "game"
          ? await prisma.gameComment.update({
              where: { id: parseInt(id) },
              data: { content },
            })
          : await prisma.discComment.update({
              where: { id: parseInt(id) },
              data: { content },
            });

      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: "Error updating comment" });
    }
  })
);

// Delete a comment
router.delete(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const { id, type } = req.query;

    try {
      const deletedComment =
        type === "game"
          ? await prisma.gameComment.delete({
              where: { id: parseInt(id) },
            })
          : await prisma.discComment.delete({
              where: { id: parseInt(id) },
            });

      res.status(200).json(deletedComment);
    } catch (error) {
      res.status(500).json({ error: "Error deleting comment" });
    }
  })
);

// Create a Game Post
router.post(
  "/post/game",
  asyncHandler(async (req, res) => {
    const { userId, content, title, gameName, gameURL } = req.body;

    try {
      const post = await prisma.gamePost.create({
        data: { userId, content, title, gameName, gameURL },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Error creating game post" });
      console.log(error);
    }
  })
);

// Get Game Posts
router.get(
  "/post/game",
  asyncHandler(async (req, res) => {
    try {
      const posts = await prisma.gamePost.findMany({});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Error loading game posts" });
      console.log(error);
    }
  })
);

// Create a Discussion Post
router.post(
  "/post/disc",
  asyncHandler(async (req, res) => {
    const { userId, content, title } = req.body;

    try {
      const post = await prisma.discPost.create({
        data: { userId, content, title },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Error creating discussion post" });
      console.log(error);
    }
  })
);

// Get Disc Posts
router.get(
  "/post/disc",
  asyncHandler(async (req, res) => {
    try {
      const posts = await prisma.discPost.findMany({});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Error loading disc posts" });
      console.log(error);
    }
  })
);

// const login = async (email, password) => {
//   try {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) throw new Error('Login failed');
//     const data = await response.json();
//     localStorage.setItem('token', data.token); // Save the token
//     console.log('User:', data.user); // Handle user data
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const register = async (username, email, password) => {
//   try {
//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, email, password }),
//     });

//     if (!response.ok) throw new Error('Registration failed');
//     const data = await response.json();
//     console.log('Registered User:', data);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const fetchUser = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) return;

//   try {
//     const response = await fetch('/api/auth/me', {
//       method: 'GET',
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!response.ok) throw new Error('Failed to fetch user');
//     const user = await response.json();
//     console.log('Logged-in User:', user);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

module.exports = router;
