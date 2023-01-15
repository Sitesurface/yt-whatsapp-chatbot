const axios = require("axios");
const { getMessages } = require("./db");

async function getCompletionChatGPT(msg) {
  const messages = getMessages(msg.from).join("");
  const response = await axios({
    method: "post",
    url: "https://api.openai.com/v1/completions",
    headers: {
      "openai-organization": "org-PaB4ld1VpvP0yEYsRB5ZhBOZ",
      authorization:
        "Bearer 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",
    },
    data: {
      model: "text-davinci-003",
      prompt: `${messages}|||${msg.body}`,
      max_tokens: 2048,
    },
  });
  return response.data.choices[0].text;
}

module.exports = getCompletionChatGPT;
