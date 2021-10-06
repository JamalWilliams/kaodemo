import server from "../../src/server";
import request from "supertest";

// close the server after each test
afterEach((done) => {
    server.close();
    done();
  });

  describe("routes/message", () => {
    it("should add message to file and update count", async () => {
      const response = await request(server).post("/message").send({
            from: "Tester",
            to: "Admin",
            message: "This is working"
      });
      expect(response.status).toEqual(401);
      expect(response.type).toEqual("text/plain");
      expect(response.text).toEqual("Not Authorized");
    });
  });