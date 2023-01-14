const fs = require("fs");

const getMessages = (user) => {
  let data = JSON.parse(fs.readFileSync("db.json"));
  return data[user];
};

const saveMessage = (user, message) => {
  let data;
  try {
    const fileData = fs.readFileSync("db.json");
    data = JSON.parse(fileData);
  } catch (err) {
    data = {};
  }

  if (!data[user]) data[user] = [];
  data[user].push(message);
  fs.writeFileSync("db.json", JSON.stringify(data));
};

module.exports = {
  getMessages,
  saveMessage,
};
