import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

// it("returns a status other than 401 if the user is signed in", async () => {
//   const cookie = await (global as any).signin();

//   const response = await request(app)
//     .post("/api/tickets")
//     .set("Cookie", cookie[0])
//     .send({});

//   expect(response.status).not.toEqual(401);
// });

it("reuturns an error if an title is provided", async () => {
  const cookie = await (global as any).signin();
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ price: 10 })
    .expect(400);
});

it("it returns an error if an invalid price is provided", async () => {
  const cookie = await (global as any).signin();
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket" })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  const cookie = await (global as any).signin();

  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: 10 })
    .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(10);
  expect(tickets[0].title).toEqual("new ticket");
});

it("publishes an event", async () => {
  const cookie = await (global as any).signin();

  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: 10 })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
