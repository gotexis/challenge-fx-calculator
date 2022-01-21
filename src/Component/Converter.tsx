import React, {useEffect, useState} from "react";
import {currencyList, fractionDigits} from "../utils/source-data";
import {useAppDispatch, useAppSelector} from "../store";
import {setErrorMessage} from "../store/ui";
import {getConversionRate} from "../utils/conversion";

const Converter = () => {
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState<number>(0);
    const [fromCurrency, setFromCurrency] = useState<string>("AUD");
    const [toCurrency, setToCurrency] = useState<string>("AUD");
    const errorMessage = useAppSelector(state => state.ui.errorMessage);

    // Inputs
    const handleInput = (e: any) => {
        if (e.target.value > 0) setAmount(e.target.value);
    };

    const handleSelectFromCurrency = (e: any) => {
        setFromCurrency(e.target.value);
    };

    const handleSelectToCurrency = (e: any) => {
        setToCurrency(e.target.value);
    };


    const conversionRate = getConversionRate(fromCurrency, toCurrency)
    const toAmount = conversionRate ? (amount * conversionRate).toFixed(fractionDigits[toCurrency]) : "";

    // redundant use of redux to set error message (due to requirement)
    useEffect(() => {
        if (!conversionRate) {
            dispatch(setErrorMessage(
                `Unable to find rate for ${fromCurrency}/${toCurrency}`
            ));
        } else {
            dispatch(setErrorMessage(""));
        }
    }, [conversionRate, fromCurrency, toCurrency]);

    return <div>
        <h1>Converter</h1>
        From
        <select
            value={fromCurrency}
            data-testid="fromCcyBox"
            onChange={handleSelectFromCurrency}
        >
            {currencyList.map((fx, index) => <option key={index}>{fx}</option>)}
        </select>
        <input
            type="number"
            data-testid="fromCcy"
            value={amount}
            onChange={handleInput}
        />
        <strong> = </strong>
        To
        <select
            value={toCurrency}
            data-testid="toCcyBox"
            onChange={handleSelectToCurrency}
        >
            {currencyList.map((fx, index) => <option key={index}>{fx}</option>)}
        </select>
        <input
            disabled
            type="number"
            data-testid="toCcy"
            value={toAmount}
        />
        {errorMessage && <h3>{errorMessage}</h3>}
    </div>;
};

export default Converter;
