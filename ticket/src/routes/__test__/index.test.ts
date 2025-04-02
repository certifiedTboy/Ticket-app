import request from "supertest";
import { app } from "../../app";

jest.mock("../../nats-wrapper");

const createTicket = () => {
  const cookie = (global as any).signin();
  const title = "Concert";
  const price = 20;

  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie[0])
    .send({ title, price })
    .expect(201);
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
