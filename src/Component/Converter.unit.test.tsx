import {render, screen} from "@testing-library/react";
import React from "react";
import Converter from "./Converter";

describe("test suits on component Converter", () => {
    //expect the title converter to be in the document
    it("should render title", () => {
        render(
            <Converter/>
        );
        const elem = screen.getByText(/Converter/);
        expect(elem).toBeInTheDocument();
    });

    //expect the button in the document
    it("should render button", () => {
        render(
            <Converter/>
        );
        const elem = screen.getByRole("button", {name: "Swap Currency"});
        expect(elem).toBeInTheDocument();
    });

    //expect initial state of amt should be 0
    it("initial amount should be 0", () => {
        render(
            <Converter/>
        );
        const inputBox1 = screen.getByTestId("fromCcy") as HTMLInputElement;
        const inputBox2 = screen.getByTestId("toCcy") as HTMLInputElement;
        expect(inputBox1.defaultValue).toBe("0");
        expect(inputBox2.defaultValue).toBe("0.00");
    });
});
