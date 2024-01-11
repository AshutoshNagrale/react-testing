import { fireEvent, render, waitFor } from "@testing-library/react";
import Login from "./Login";
import { __esModule } from "@testing-library/jest-dom/dist/matchers";

describe(Login, () => {
  __esModule: true,
    jest.mock("axios", () => ({
      default: {
        get: () => ({
          data: { id: 1, name: "ashutosh" },
        }),
      },
    }));

  it("username input should be rendered", () => {
    const { getByPlaceholderText } = render(<Login />);
    const usernameInput = getByPlaceholderText("Username");
    expect(usernameInput).toBeInTheDocument();
  });

  it("password input should be rendered", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("login button should be rendered", () => {
    const { getByRole } = render(<Login />);
    const loginButton = getByRole("button");
    expect(loginButton).toBeInTheDocument();
  });

  it("username should be initialy empty", () => {
    const { getByPlaceholderText } = render(<Login />);
    const userInputText = getByPlaceholderText("Username").value;
    expect(userInputText).toBe("");
  });

  it("password should be initialy empty", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwrodInputText = getByPlaceholderText("Password").value;
    expect(passwrodInputText).toBe("");
  });

  it("login button should be initially disabled ", () => {
    const { getByRole } = render(<Login />);
    const loginButton = getByRole("button");
    expect(loginButton).toBeDisabled();
  });

  it("error initially should not be visible ", () => {
    const { getByTestId } = render(<Login />);
    const errorMsg = getByTestId("error");
    expect(errorMsg).not.toBeVisible();
  });

  it("username should be change on type", () => {
    const { getByPlaceholderText } = render(<Login />);
    const userInput = getByPlaceholderText("Username");
    const testValue = "ashutosh";
    fireEvent.change(userInput, { target: { value: testValue } });
    expect(userInput.value).toBe(testValue);
  });

  it("password should be change on type", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText(/Password/i);
    const testPassvalue = "password123";
    fireEvent.change(passwordInput, { target: { value: testPassvalue } });
    expect(passwordInput.value).toBe(testPassvalue);
  });

  it("button should not be disable if input exist", () => {
    const { getByRole, getByPlaceholderText } = render(<Login />);
    const loginButton = getByRole("button");

    const userInput = getByPlaceholderText(/Username/i);
    const passwordInput = getByPlaceholderText(/Password/i);

    const testValue = "ashutosh";

    fireEvent.change(userInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: testValue } });

    expect(loginButton).not.toBeDisabled();
  });

  it("loading text in login button should not be rendered", () => {
    const { getByRole } = render(<Login />);
    const loginButton = getByRole("button");
    expect(loginButton).not.toHaveTextContent(/Loading/i);
  });

  it("loading text in login button should be rendered when input exit and button clicked", () => {
    const { getByRole, getByPlaceholderText } = render(<Login />);
    const loginButton = getByRole("button");

    const userInput = getByPlaceholderText(/Username/i);
    const passwordInput = getByPlaceholderText(/Password/i);

    const testValue = "ashutosh";
    const testPass = "ashu@1234";

    fireEvent.change(userInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: testPass } });

    fireEvent.click(loginButton);

    expect(loginButton).toHaveTextContent(/Loading/i);
  });

  it("loading text should not be rendered after data fetching", async () => {
    const { getByRole, getByPlaceholderText } = render(<Login />);
    const loginButton = getByRole("button");

    const userInput = getByPlaceholderText(/Username/i);
    const passwordInput = getByPlaceholderText(/Password/i);

    const testValue = "ashutosh";
    const testPass = "ashu@1234";

    fireEvent.change(userInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: testPass } });

    fireEvent.click(loginButton);

    await waitFor(() => expect(loginButton).not.toHaveTextContent(/Loading/i));
  });
});
