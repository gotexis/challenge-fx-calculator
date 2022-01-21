import {rates} from "./source-data";

export const getDirectConversionRate = (from: string, to: string) => {

    const pairedCurrency = rates.find(
        ccy => ccy.base === from && ccy.terms === to
    );

    const invPairedCurrency = rates.find(
        ccy => ccy.base === to && ccy.terms === from
    );

    if (pairedCurrency) return pairedCurrency.value
    if (invPairedCurrency) return 1 / invPairedCurrency.value

    // can't convert directly
    return null
}

export const findMediumCurrencyCandidates = (from: string, to: string): string | undefined => {
    // take the base currency and find all possible terms currency
    const baseMediumCandidates: string[] = rates.filter(({base}) => base === from).map(({terms}) => terms);
    // take the terms currency and find all possible base currency
    const termsMediumCandidates: string[] = rates.filter(({terms}) => terms === to).map(({base}) => base);

    // find intersection
    const mediumCandidates = baseMediumCandidates.filter(base => termsMediumCandidates.includes(base));

    if (mediumCandidates.length > 1) {
        console.warn(`
          Multiple possible path found for converting currency.
          I didn't think this would happen given our data source. 
          But if you do see this, maybe this can be resolved through a "cross-via" table.
    `)
    }

    // return the first candidate (or undefined if no candidate)
    return mediumCandidates[0];
}

export const getConversionRate = (from: string, to: string) => {

    // first try to get currency from direct / inv
    const directRate = getDirectConversionRate(from, to)
    if (directRate) return directRate

    // determine whether medium currency is present
    const mediumCandidate = findMediumCurrencyCandidates(from, to)
    if (mediumCandidate) {
        const crossViaRate = getDirectConversionRate(from, mediumCandidate)! * getDirectConversionRate(mediumCandidate, to)!
        return crossViaRate
    }

    // unable to find rate
    return null
}

