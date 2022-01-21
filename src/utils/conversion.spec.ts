import {findMediumCurrencyCandidates} from './conversion';

describe("findMediumCurrencyCandidates", () => {
    it("doesn't find medium currency for GBP / DKK", async() => {

        const result = await findMediumCurrencyCandidates("GBP", "DKK");
        expect(result).toBeUndefined();
    });

    it("finds medium currency for AUD / JPY", async() => {

        const result = await findMediumCurrencyCandidates("AUD", "JPY");
        expect(result).toEqual("USD");
    });

    it("medium for NOK / USD is EUR", async() => {
        const result = await findMediumCurrencyCandidates("NOK", "USD");
        expect(result).toEqual("EUR");
    });

})