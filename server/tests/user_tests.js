process.env.NODE_ENV = "test";

var assert = require("assert");
var rp = require("request-promise");
var app = require("../app");
var mongoose = require("mongoose");

var testUser1 = {
  name: "Curtis Larson",
  age: 24,
};

var testUser2 = {
  name: "Carlos Larson",
  age: 12,
};

function url(path) {
  return "http://localhost:3111" + path
}

describe("users", function() {
  this.timeout(10000);

  afterEach((done) => {
    app.get("mongoose").connection.db.dropDatabase((err) => {
      done();
    });
  });

  it("should create and retrieve a user", (done) => {
    var tests = [
      testUser1,
    ];

    tests.map((test) => {
      rp({
        method: "post",
        url: url("/v1/users"),
        json: true,
        body: test,
      })
        .then((body) => rp({
          method: "get",
          url: url("/v1/users/" + body._id),
          json: true,
        }))
        .then((body) => {
          checkUserResponse(test, body);
          done();
        });
    });
  });

  it("should create and delete a user", (done) => {
    var tests = [
      testUser1,
    ];

    tests.map((test) => {
      rp({
        method: "post",
        url: url("/v1/users"),
        json: true,
        body: test,
      })
        .then((body) => rp({
          method: "delete",
          url: url("/v1/users/" + body._id),
          json: true,
        }))
        .then((body) => {
          done();
        });
    });
  });

  it("should create, update, and retrieve the new user", (done) => {
    rp({
      method: "post",
      url: url("/v1/users"),
      json: true,
      body: testUser1,
    }).then((body) => rp({
      method: "post",
      url: url("/v1/users/" + body._id),
      json: true,
      body: testUser2
    })).then((body) => rp({
      method: "get",
      url: url("/v1/users/" + body._id),
      json: true,
    })).then((body) => {
      checkUserResponse(testUser2, body);
      done();
    });
  });

  it("should create 100 random users and search for them", (done) => {
    var reqs = [];
    for (var i = 0; i < 100; i++) {
      reqs.push(
        rp({
          method: "post",
          url: url("/v1/users"),
          json: true,
          body: {
            name: randomString(),
            age: randomAge(),
          },
        })
      );
    }
    var p = Promise.all(reqs);
    p.then(() => rp({
      // Search with limit
      method: "post",
      url: url("/v1/users/search"),
      json: true,
      body: {
        age: 12,
        limit: 10,
      },
    })).then((results) => {
      assert.equal(results.users.length, 10);
      // not 100% likely but this just proves our count works
      assert(results.count > 10);
    }).then(() => rp({
      // Search without limit
      method: "post",
      url: url("/v1/users/search"),
      json: true,
      body: {
        age: 10,
      },
    })).then((results) => {
      assert.equal(results.users.length, results.count);
    }).then(() => rp({
      // Search without limit
      method: "post",
      url: url("/v1/users/search"),
      json: true,
      body: {
        name: "a",
      },
    })).then((results) => {
      assert(results.users.length > 0);
    }).then(() => {
      done();
    });
  });
});

function randomString()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function randomAge() {
  var rand = Math.random();
  if (rand >= 0.5) {
    return 10;
  }
  return 12;
}

function checkUserResponse(expected, actual) {
  assert.equal(expected.name, actual.name);
  assert.equal(expected.age, actual.age);
}
