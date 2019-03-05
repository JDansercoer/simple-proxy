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
  const headers = {
    "Content-Type": "application/json",
    Cookie: cookiesToString(req)
  };

  if (req.headers && req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }

  axios({
    method: "post",
    url: req.originalUrl.slice(1),
    headers,
    data: req.body,
    withCredentials: true
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log("Error", error.message);
    });
});

app.put("/*", (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Cookie: cookiesToString(req)
  };

  if (req.headers && req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }

  axios({
    method: "put",
    url: req.originalUrl.slice(1),
    headers,
    data: req.body,
    withCredentials: true
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log("Error", error.message);
    });
});

app.get("/*", (req, res) => {
  axios({
    method: "get",
    url: req.originalUrl.slice(1),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookiesToString(req)
    },
    data: req.body,
    withCredentials: true
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log("Error", error.message);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
