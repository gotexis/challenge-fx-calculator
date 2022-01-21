import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import store from "../store";
import App from "../App";

describe("test AUD/USD rate conversion", () => {
    it("should render correct USD amt with AUD input", () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        const fromCcy = screen.getByTestId("fromCcyBox");
        const toCcy = screen.getByTestId("toCcyBox");
        // console.log("result here", fromCcy.selectedIndex);
        fireEvent.change(fromCcy, {target: {value: "AUD"}});
        fireEvent.change(toCcy, {target: {value: "USD"}});
        const inputBox1 = screen.getByTestId("fromCcy");
        fireEvent.change(inputBox1, {target: {value: 1}});
        const inputBox2 = screen.getByTestId("toCcy") as HTMLInputElement;
        expect(inputBox2.value).toBe("0.84");
    });
});
