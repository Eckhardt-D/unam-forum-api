module.exports = () => {
  if (process.version == "v10.15.3") {
    console.log(
      `\nWelcome student, to ensure that you're consistent with the repository - 
      please install v10.15.3 of Node.js (The LTS version).\n`
    );
    return process.exit(1);
  }
};
