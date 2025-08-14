import { fireEvent, render, screen } from "@testing-library/react";
import App from "../_app";
import { describe, expect, it } from "vitest";

describe("App component", () => {
  it("renders navigation and routes correctly", async () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About me/i })).toBeInTheDocument();

    expect(screen.getByText(/Characters Rick/i)).toBeInTheDocument();
  });

  it("renders About page based on URL", () => {
    window.history.pushState({}, "", "/about");

    render(<App />);

    expect(screen.getByText(/I'm a frontend developer/i)).toBeInTheDocument();
  });

  it("renders About page based on URL", () => {
    window.history.pushState({}, "", "/abrakadabra");

    render(<App />);

    expect(screen.getByText(/ERROR 404/i)).toBeInTheDocument();
  });

  it("toggles theme on click", () => {
    localStorage.removeItem("theme");
    document.documentElement.classList.remove("dark");

    render(<App />);
    const themeButton = screen.getByTestId("theme");

    fireEvent.click(themeButton);
    expect(themeButton).toHaveTextContent("🌙 Dark");

    fireEvent.click(themeButton);
    expect(themeButton).toHaveTextContent("☀️ Light");
  });
});
