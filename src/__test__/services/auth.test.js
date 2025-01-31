import { login } from "@/services/auth";
import axios from "axios";

// Buat data tiruan yang dikirim ke API
jest.mock("axios");

describe("Login", () => {
  it("test fungsi login dengan payload yang sesuai", async () => {
    const payload = {
      username: "danu",
      password: "123",
    };

    await login(payload);

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API}/auth/login`,
      payload
    );
  });

  it("test fungsi login gagal dengan payload yang tidak sesuai", async () => {
    const payload = {
      username: "danu",
      password: "123",
    };
    // Simulasi error boongan
    const error = new Error("Login gagal");
    // mockRejectedValue : fungsi buat ngembaliin error
    axios.post.mockRejectedValue(error);
    // Manggil service login
    const res = await login(payload);

    // toEqual fungsi buat bandingin hasil
    expect(res).toEqual({ status: false, error });
  });

  it("test fungsi login gagal dengan payload yang tidak sesuai", async () => {
    const payload = {
      username: "danu",
      password: "123",
    };
    const token = "token123";
    // mockResolvedValue : fungsi buat ngembaliin status sukses (pura2 sukses)
    axios.post.mockResolvedValue({ data: { token } });
    const res = await login(payload);

    expect(res).toEqual({ status: true, token });
  });
});
