const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;
const axios = require("axios");
const bodyParser = require("body-parser");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
const _ = require("lodash");

app.use(morgan("tiny"));

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(cookieParser());

function cookiesToString(req) {
  const cookieString = _.reduce(
    req.cookies,
    function(string, cookieValue, cookieKey) {
      return `${string} ${cookieKey}=${cookieValue};`;
    },
    ""
  );

  return cookieString;
}

app.post("/*", (req, res) => {
  axios({
    method: "post",
    url: req.originalUrl.slice(1),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookiesToString(req)
    },
    data: req.body,
    withCredentials: true
  }).then(response => {
    res.send(response.data);
  });
});

app.put("/*", (req, res) => {
  cookiesToString(req);
  axios({
    method: "put",
    url: req.originalUrl.slice(1),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookiesToString(req)
    },
    data: req.body,
    withCredentials: true
  }).then(response => {
    res.send(response.data);
  });
});

app.get("/*", (req, res) => {
  cookiesToString(req);
  axios({
    method: "get",
    url: req.originalUrl.slice(1),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookiesToString(req)
    },
    data: req.body,
    withCredentials: true
  }).then(response => {
    res.send(response.data);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));