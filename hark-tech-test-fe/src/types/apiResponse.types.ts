export interface EnergyData {
    timestamp: Date;
    consumption: number;
    isAnomaly: boolean;
}

export interface WeatherData {
    date: Date;
    averageTemperature: number;
}