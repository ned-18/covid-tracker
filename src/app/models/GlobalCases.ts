export interface SummaryCases {
    Countries: {
        Country: string;
        CountryCode: string;
        Date: string;
        ID: string;
        NewConfirmed: number;
        NewDeaths: number;
        NewRecovered: number;
        Slug: string;
        TotalConfirmed: number;
        TotalDeaths: number;
        TotalRecovered: number;
        Premium: {};
    }[];
    Date: string;
    Global: {
        Date: string;
        NewConfirmed: number;
        NewDeaths: number;
        NewRecovered: number;
        TotalConfirmed: number;
        TotalDeaths: number;
        TotalRecovered: number;
    };
    ID: string;
    Message: string;
}

export interface WorldTotalCases {
    Date: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
}
