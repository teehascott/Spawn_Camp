const express = require("express");
const ViteExpress = require("vite-express");

const app = require('../client/app');
// const { seed, client } = require('./prisma');
// const { seed } = require('./prisma');

const init = async()=> {
  try {
    // await client.connect();
    if(process.env.SYNC === 'TRUE'){
      // await seed();
    }
    const port = process.env.PORT || 3000;
    ViteExpress.listen(app, port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  }
  catch(ex){
    console.log(ex);
  }
};

init();


