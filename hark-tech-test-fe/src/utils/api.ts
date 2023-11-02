import axios from "axios"
import { EnergyData, WeatherData } from "../types/apiResponse.types";

export const getEnergyData = async (startDate?: Date, endDate?: Date): Promise<EnergyData[]> => {
    const res = await axios.post<EnergyData[]>("/energyData", { startDate, endDate });
    return res.data;
}

export const getWeatherData = async (startDate?: Date, endDate?: Date): Promise<WeatherData[]> => {
    const res = await axios.post<WeatherData[]>("/weather", { startDate, endDate });
    return res.data;
}