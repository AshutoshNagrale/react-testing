import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe(Counter, () => {
  it("display initial counter as 0", () => {
    const { getByTestId } = render(<Counter initialCount={0} />);
    const value = Number(getByTestId("count").textContent);
    expect(value).toEqual(0);
  });

  it("increment count by 1 on increment button clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={0} />);
    const incrementButton = getByRole("button", { name: "Increment" });
    fireEvent.click(incrementButton);
    const countValue = Number(getByTestId("count").textContent);
    expect(countValue).toEqual(1);
  });

  it("decrement count by 1 on decrement button clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={4} />);
    const decrementButton = getByRole("button", { name: "Decrement" });
    fireEvent.click(decrementButton);
    const countValue = Number(getByTestId("count").textContent);
    expect(countValue).toEqual(3);
  });

  it("reset count to 0 on reset button clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={7} />);
    const restartButton = getByRole("button", { name: "Restart" });
    fireEvent.click(restartButton);
    const countValue = Number(getByTestId("count").textContent);
    expect(countValue).toEqual(0);
  });

  it("change sign to number on switch sign button clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={90} />);
    const switchSignButton = getByRole("button", { name: "Switch Signs" });
    fireEvent.click(switchSignButton);
    const countValue = Number(getByTestId("count").textContent);
    expect(countValue).toEqual(-90);
  });
});
