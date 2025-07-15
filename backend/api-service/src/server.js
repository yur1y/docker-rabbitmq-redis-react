const app = require("./app");
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`NASA CGI API backend running on port ${PORT}`);
});
