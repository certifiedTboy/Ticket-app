import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const cookie = await (global as any).signin();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: 10 })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "new ticket", price: 10 })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const cookie = await (global as any).signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: 10 });

  const cookie2 = await (global as any).signin();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie2[0])
    .send({ title: "new ticket 2", price: 20 })
    .expect(401);
});

it("returns a 400 if the user does not provide a valid title or price", async () => {
  const cookie = await (global as any).signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: 10 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie[0])
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: -10 })
    .expect(400);
});

it("updates the ticket if provided valid inputs", async () => {
  const cookie = await (global as any).signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: 10 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie[0])
    .send({ title: "new ticket 2", price: 20 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("new ticket 2");
  expect(ticketResponse.body.price).toEqual(20);
});

it("publishes an event", async () => {
  const cookie = await (global as any).signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: 10 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie[0])
    .send({ title: "new ticket 2", price: 20 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if the ticket is reserved", async () => {
  const cookie = await (global as any).signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title: "new ticket", price: 10 });

  const ticket = await Ticket.findById(response.body.id);

  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });

  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie[0])
    .send({ title: "new ticket 2", price: 20 })
    .expect(400);
});
