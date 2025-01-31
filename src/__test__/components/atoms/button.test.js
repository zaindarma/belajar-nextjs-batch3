import Button from "@/components/atoms/Button";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

describe("Button", () => {
  it("render button dengan children yang sesuai", () => {
    // getByText() : fungsi untuk ngambil elemen dengan text tertentu
    const { getByText } = render(<Button>Login</Button>);

    // toBeInTheDocument : fungsi buat mastiin elemen tersebut ada di DOM virtual
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("render button dengan warna biru", () => {
    // render dulu komponennya
    const { getByText } = render(
      <Button buttonClassname="bg-blue-500">Login</Button>
    );

    // tampung komponen yang di render ke variable button
    const button = getByText("Login").closest("button");
    // closest() : fungsi buat ngambil elemen tedekat dengan tag tertentu

    // toContain : fungsi buat mastiin elemen punya class tertentu
    expect(button.className).toContain("bg-blue-500");
  });

  it("render button dengan w full", () => {
    const { getByText } = render(
      <Button buttonClassname="w-full">Login</Button>
    );
    const button = getByText("Login").closest("button");
    expect(button.className).toContain("w-full");
  });

  it("render button dengan type tertentu", () => {
    const { getByText } = render(
      <Button buttonClassname="w-full">Login</Button>
    );
    const button = getByText("Login").closest("button");
    // toBe : fungsi buat mastiin suatu elemen punya type tertentu
    expect(button.type).toBe("submit");
  });
  it("Test fungsi onClick pada button ketika di klik", () => {
    // jest.fn() : fungsi buat mock function (data/fungsi tiruan)
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Login</Button>);
    const button = getByText("Login").closest("button");
    // fireEvent : fungsi buat simulasi event handler di suatu elemen
    fireEvent.click(button);

    // toHaveBeenCalledTimes : fungsi buat mastiin kalo fungsi onClick dipanggil sebanyak 1 kali
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
