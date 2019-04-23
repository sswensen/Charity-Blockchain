https://truffleframework.com/tutorials/getting-started-with-drizzle-and-react


Open up React App in incognito mode so that it dose not use metamask and it uses ganash instead 

Make sure that ganash and the line in index.js are on the same url port:


const options = {
  contracts: [MyStringStore],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};
