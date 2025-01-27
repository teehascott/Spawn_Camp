const { PrismaClient } = require('@prisma/client'); // Import PrismaClient
//const prisma = new PrismaClient(); // Initialize PrismaClient
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});


const seed = async () => {
  try {
  // Create users
  const userResults = await Promise.allSettled([
    prisma.user.create({
      data: {
        username: 'nepeta',
        email: 'meowzers@example.com',
        password: 'password123',
        bio: 'Meowdy. I love a good snuggle.',
        avatar: 'https://cdn.discordapp.com/attachments/541902551503863810/1326209479716638791/cat1.png',
      },
    }),
    prisma.user.create({
      data: {
        username: 'NUDAcris',
        email: 'bigboy1234@example.com',
        password: 'password124',
        bio: 'I like to scream.',
        avatar: 'https://cdn.discordapp.com/attachments/541902551503863810/1326209489212543057/cat2.png',
      },
    }),
    prisma.user.create({
      data: {
        username: 'pumpkin3000',
        email: 'kissesnow6@example.com',
        password: 'password125',
        bio: 'I supply only the softest of kisses. Followed by a bite.',
        avatar: 'https://cdn.discordapp.com/attachments/541902551503863810/1326209498154537041/cat3.png',
      },
    }),
    prisma.user.create({
      data: {
        username: 'gumb0',
        email: 'bigbrother@example.com',
        password: 'password126',
        bio: 'I am just a silly guy.',
        avatar: 'https://cdn.discordapp.com/attachments/541902551503863810/1326209507025748048/cat4.png',
      },
    }),
    prisma.user.create({
      data: {
        username: 'Mr Tuna',
        email: 'angelbaby8@example.com',
        password: 'password127',
        bio: 'I am a distinguished gentleman. And I love milk.',
        avatar: 'https://cdn.discordapp.com/attachments/541902551503863810/1326209515703631933/cat5.png',
      },
    }),
  ]);

    // Filter successfully created users
    const createdUsers = userResults
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);

    // Log errors for rejected users
    userResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Error creating user ${index + 1}:`, result.reason);
      }
    });

    if (createdUsers.length === 0) throw new Error('No users were created.');
    console.log('Created Users:', createdUsers);

  // Create game posts
  const gamePostResult = await Promise.allSettled([
    prisma.gamePost.create({
      data: {
        title: '2048',
        userId: createdUsers[0].id,
        gameName: '2048',
        gameURL: 'https://example.com/super-fun-game',
        content: 'Simple puzzle game.',
        createdAt: new Date("2024-11-13"),
      },
    }),
    prisma.gamePost.create({
      data: {
        title: 'JRPG made for nerds',
        userId: createdUsers[1].id,
        gameName: 'The Legend of Link',
        gameURL: 'https://example.com/super-fun-game',
        content: 'Hyaa!',
        createdAt: new Date("2024-11-14"),
      },
    }),
    prisma.gamePost.create({
      data: {
        title: 'If you Love to Cook, Play This',
        userId: createdUsers[2].id,
        gameName: 'Cooking Papa',
        gameURL: 'https://example.com/super-fun-game',
        content: 'Cook with the father you\'ve never had.',
        createdAt: new Date("2024-11-17"),
      },
    }),
    prisma.gamePost.create({
      data: {
        title: 'Huge game for Gamers!',
        userId: createdUsers[3].id,
        gameName: 'World of Lovecraft',
        gameURL: 'https://example.com/super-fun-game',
        content: 'MMO made with love! <3',
        createdAt: new Date("2024-11-18"),
      },
    }),
    prisma.gamePost.create({
      data: {
        title: 'Just a moba',
        userId: createdUsers[4].id,
        gameName: 'League of Normal Dudes',
        gameURL: 'https://example.com/super-fun-game',
        content: 'Play if you hate yourself.',
        createdAt: new Date("2024-11-18"),
      },
    }),
  ]);

     // Filter successfully created game posts
     const createdGamePosts = gamePostResults
     .filter((result) => result.status === 'fulfilled')
     .map((result) => result.value);

   if (createdGamePosts.length === 0) throw new Error('No game posts were created.');
   
   console.log('GameComments Data:', gameCommentsData);

  // Create game comments
  const gameCommentsData = [
    // { userId: users[0].id, gameId: gamePosts[0].gameId, content: 'test1' },
    // { userId: users[0].id, gameId: gamePosts[1].gameId, content: 'test2' },
    // { userId: users[1].id, gameId: gamePosts[2].gameId, content: 'test3' },
    // { userId: users[1].id, gameId: gamePosts[3].gameId, content: 'test4' },
    // { userId: users[2].id, gameId: gamePosts[4].gameId, content: 'test5' },
    // { userId: users[2].id, gameId: gamePosts[5].gameId, content: 'test6' },
    // { userId: users[3].id, gameId: gamePosts[6].gameId, content: 'test7' },
    // { userId: users[3].id, gameId: gamePosts[7].gameId, content: 'test8' },
    // { userId: users[4].id, gameId: gamePosts[8].gameId, content: 'test9' },
    // { userId: users[4].id, gameId: gamePosts[9].gameId, content: 'test10' },
    { userId: createdUsers[0].id, gameId: createdGamePosts[0].gameId, content: 'test1' },
    { userId: createdUsers[1].id, gameId: createdGamePosts[1].gameId, content: 'test2' },
    { userId: createdUsers[2].id, gameId: createdGamePosts[2].gameId, content: 'test3' },
    { userId: createdUsers[3].id, gameId: createdGamePosts[3].gameId, content: 'test4' },
    { userId: createdUsers[4].id, gameId: createdGamePosts[4].gameId, content: 'test5' },
  ];

  const gameCommentResults = await Promise.allSettled(
    gameCommentsData.map((comment) =>
      prisma.gameComment.create({
        data: {
          userId: comment.userId,
          gameId: comment.gameId,
          content: comment.content,
        },
      })
    )
  );
  
  // Log errors if any
  gameCommentResults.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Error creating game comment ${index + 1}:`, result.reason);
    }
  });
  
  // Filter successfully created game comments
  const createdGameComments = gameCommentResults
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);
  
  if (createdGameComments.length === 0) throw new Error('No game comments were created.');
  
  console.log('Created Game Comments:', createdGameComments);

//   // Create discussion posts
//   const discPosts = await Promise.all([
//     prisma.discPost.create({
//       data: {
//         title: 'How do I download more RAM?',
//         userId: createdUsers[0].id,
//         content: 'I was told I could download more RAM. How do I do it?',
//         createdAt: new Date("2024-12-24"),
//       },
//     }),
//     prisma.discPost.create({
//       data: {
//         title: 'LIST OF LEGEND OF LINK EASTER EGGS',
//         userId: createdUsers[1].id,
//         content: 'NEVER GUNNA GIVE YOU UP, NEVER GUNNA LET YOU DOWN.',
//         createdAt: new Date("2024-12-25"),
//       },
//     }),
//     prisma.discPost.create({
//         data: {
//         title: 'I Think League Of Normal Dudes Is A Terrible Game.',
//         userId: createdUsers[2].id,
//         content: 'Why Do You Fools Play That Awful Game?',
//         createdAt: new Date("2024-12-26"),
//         },
//       }),
//       prisma.discPost.create({
//         data: {
//         title: 'hi',
//         userId: createdUsers[3].id,
//         content: 'im new to this website i wanna make some friends (:',
//         createdAt: new Date("2024-12-27"),
//         },
//       }),
//       prisma.discPost.create({
//         data: {
//         title: 'SOMA has been living in my head rent free.',
//         userId: createdUsers[4].id,
//         content: 'Its a decade old now and it still one of the most interesting horror games out there.',
//         createdAt: new Date("2024-12-28"),
//         },
//       }),
//       //::contentReference[oaicite:0]{index=0}
//   ]);

 

//   // Create a discussion comment

// const discCommentsData = [
//     // { userId: users[0].id, discId: discPosts[0].discId, content: 'test1' },
//     // { userId: users[0].id, discId: discPosts[1].discId, content: 'test2' },
//     // { userId: users[1].id, discId: discPosts[2].discId, content: 'test3' },
//     // { userId: users[1].id, discId: discPosts[3].discId, content: 'test4' },
//     // { userId: users[2].id, discId: discPosts[4].discId, content: 'test5' },
//     // { userId: users[2].id, discId: discPosts[5].discId, content: 'test6' },
//     // { userId: users[3].id, discId: discPosts[6].discId, content: 'test7' },
//     // { userId: users[3].id, discId: discPosts[7].discId, content: 'test8' },
//     // { userId: users[4].id, discId: discPosts[8].discId, content: 'test9' },
//     // { userId: users[4].id, discId: discPosts[9].discId, content: 'test10' },
//     { userId: createdUsers[0].id, discId: discPosts[0].id, content: 'test1' },
//     { userId: createdUsers[1].id, discId: discPosts[1].id, content: 'test2' },
//     { userId: createdUsers[2].id, discId: discPosts[2].id, content: 'test3' },
//     { userId: createdUsers[3].id, discId: discPosts[3].id, content: 'test4' },
//     { userId: createdUsers[4].id, discId: discPosts[4].id, content: 'test5' },
//   ];

//   await Promise.all(
//     discCommentsData.map((comment) =>
//       prisma.discComment.create({
//         data: {
//           userId: comment.userId,
//           discId: comment.discId,
//           content: comment.content,
//         },
//       })
//     )
//   );

//     // Log errors and successes
//     discCommentsData.forEach((result, index) => {
//       if (result.status === 'rejected') {
//         console.error(`Error creating game post ${index + 1}:`, result.reason);
//       }
//     });
// ctrl + k + c
  console.log('Database seeded!');
} catch (error) {
  console.error('Error seeding the database:', error);
} finally {
  await prisma.$disconnect();
}
};

seed();