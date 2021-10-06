import server from "../../src/server";
import request from "supertest";
import fs from "fs";

const messagelogFile = '../../messagelog.json';

// close the server after each test
afterEach((done) => {
  server.close();
  done();
});


describe("routes/stats", () => {
  it("No credintials should get no auth message", async () => {
    const response = await request(server).get("/stats");
    expect(response.status).toEqual(401);
    expect(response.type).toEqual("text/plain");
    expect(response.text).toEqual("Not Authorized");
  
  });

  it("User credintials should get no auth message", async () => {
    const response = await request(server).get("/stats");
    expect(response.status).toEqual(401);
    expect(response.type).toEqual("text/plain");
    expect(response.text).toEqual("Not Authorized");
  
  });

  it("invalid credintials should get no auth message", async () => {
    const response = await request(server).get("/stats");
    expect(response.status).toEqual(401);
    expect(response.type).toEqual("text/plain");
    expect(response.text).toEqual("Not Authorized");
  
  });
});