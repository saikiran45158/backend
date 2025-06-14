import conn from "../../db_manipulations/db_connection";
import request from "supertest";
import app from "../../app";
import token from "../token";

describe("checking addEmployee function", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("addEmployee should return 200", async () => {
    // Explicitly cast mockQuery to jest.Mock returning Promise<any>
    const mockQuery = jest.spyOn(conn, "query") as unknown as jest.Mock<Promise<any>>;

    // Return a resolved promise with an empty array or appropriate mock result
    mockQuery.mockResolvedValue([]);

    const res = await request(app)
      .post("/add")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  test("addEmployee should return 409", async () => {
    const mockQuery = jest.spyOn(conn, "query") as unknown as jest.Mock<Promise<any>>;

    // Mock rejected promise with an error-like object
    mockQuery.mockRejectedValue({ code: 409 });

    const res = await request(app)
      .post("/add")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(409);
  });
});
