module.exports = () => {
  if (process.version != "v10.16.0") {
    console.log(
      `\nERROR_MESSAGE: Welcome student, to ensure that you're consistent with the repository - 
      please install v10.16.0 of Node.js (The LTS version). https://nodejs.org/en/download/ \n\n`
    );
    return process.exit(1);
  }
};
