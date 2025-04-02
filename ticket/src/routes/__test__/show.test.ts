import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const cookie = await (global as any).signin();

  const title = "Concert";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title, price })
    .expect(201);

  await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);
});
