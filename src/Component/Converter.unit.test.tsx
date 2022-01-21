import {render, screen} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import store from "../store";
import App from "../App";

describe("test suits on component Converter", () => {
    it("should render title", () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        const elem = screen.getByText(/Converter/);
        expect(elem).toBeInTheDocument();
    });

    it("initial amount should be 0", () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        const inputBox1 = screen.getByTestId("fromCcy") as HTMLInputElement;
        const inputBox2 = screen.getByTestId("toCcy") as HTMLInputElement;
        expect(inputBox1.defaultValue).toBe("0");
        expect(inputBox2.defaultValue).toBe("0.00");
    });
});
