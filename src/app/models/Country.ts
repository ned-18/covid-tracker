export interface Country {
    Active: number;
    City: string;
    CityCode: string;
    Confirmed: number;
    Country: string;
    CountryCode: string;
    Date: string;
    Deaths: number;
    ID: string;
    Lat: string;
    Lon: string;
    Province: string;
    Recovered: number;
}

export interface CountryByStatus {
    Country: string;
    CountryCode: string;
    Province: string;
    City: string;
    CityCode: string;
    Lat: string;
    Lon: string;
    Cases: number;
    Status: string;
    Date: string;
}

export interface CountryChartAllStatus {
    data: {
        labels: string[];
        datasets: {
            label: string;
            backgroundColor: string;
            data: number[];
        }[];
    };
    date: string;
}

export interface CountryChartByStatus {
    data: {
        label: string;
        backgroundColor: string;
        data: number[];
    };
    date: string;
}

// export interface CompareCountriesChart {
//     labels: string[];
//     datasets: [
//         {
//             label: string;
//             backgroundColor: string;
//             borderColor: string;
//             pointBackgroundColor: string;
//             pointBorderColor: string;
//             pointHoverBackgroundColor: string;
//             pointHoverBorderColor: string;
//             data: number[];
//         }
//     ];
// }

export interface Data {
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        data: number[];
    }[];
}

// export interface Options {
//     animation: {
//         duration: number;
//     };
//     hover: {
//         animationDuration: number;
//     };
//     responsiveAnimationDuration: number;
// }
