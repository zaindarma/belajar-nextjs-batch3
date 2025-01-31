const { default: LoginPage } = require("@/pages/login");
const { render } = require("@testing-library/react");
import "@testing-library/jest-dom";

// Describe : function untuk mengelompokkan test case yang berhubungan dengan suatu komponen
describe("LoginPage", () => {
  // it(): fungsi buat nulis/mendefinisikan suatu test case
  it("render halaman login sesuai spesifikasi", () => {
    // render() : fungsi buat ngerender komponen ke DOM virtual
    const page = render(<LoginPage />);

    // expect() : fungsi buat bikin assertion(bandingin hasil yang diharapkan dengan hasil yang sebenarnya)
    // toMatchSnapshot : fungsi buat snapshot hasil render
    expect(page).toMatchSnapshot();
  });
});
