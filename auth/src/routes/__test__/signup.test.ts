import request from "supertest";
import { app } from "../../app";

it("returns a 201 of successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "etosin70@gmail.com",
      password: "password",
    })
    .expect(201);
});

it(" returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "gebirrishemail",
      password: "password",
    })
    .expect(400);
});

it(" returns a 400 with an invalid passoord", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "gebirrishemail",
      password: "pass",
    })
    .expect(400);
});

it(" returns a 400 with missin email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "etosin70@gmail.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "etosin70@gmail.com", password: "password" })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "etosin70@gmail.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
