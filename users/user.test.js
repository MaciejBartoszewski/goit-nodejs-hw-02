/* eslint-disable no-undef */
const httpMocks = require("node-mocks-http");
const { signupHandler } = require("./user.controller");
const { createUser } = require("./user.dao");

const avatar = {
  password: "avatar",
  email: "avatar@test.com",
  subscription: "pro",
};
jest.mock("./user.dao", () => ({
  createUser: jest.fn().mockResolvedValue(avatar),
  getUser: jest.fn().mockResolvedValue({
    ...avatar,
    validatePassword: jest.fn().mockResolvedValue(true),
  }),
  updateUser: jest.fn().mockResolvedValue(avatar),
}));

jest.mock("../auth/auth.service", () => ({
  generateAccessToken: jest.fn().mockReturnValue("new-token-generated"),
}));

describe("signupHandler test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const createRequest = (body) => {
    return httpMocks.createRequest({ body });
  };

  const verifyResponse = (res, expectedStatusCode, expectedData) => {
    expect(res.statusCode).toEqual(expectedStatusCode);
    expect(res._getData()).toEqual(expectedData);
  };

  it("should return user on signup", async () => {
    const req = createRequest({
      email: "avatar@test.com",
      password: "avatar",
    });
    const res = httpMocks.createResponse();

    await signupHandler(req, res);

    expect(createUser).toHaveBeenCalledWith({
      email: "avatar@test.com",
      password: "avatar",
    });

    verifyResponse(res, 201, {
      user: {
        email: "avatar@test.com",
        subscription: "pro",
      },
    });
  });
});
