import { Box, Card, CardContent, CardHeader, Grid, Typography, styled, useEventCallback } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { getEnergyData, getWeatherData } from "../utils/api"
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { EnergyData, WeatherData } from "../types/apiResponse.types";
import { rem } from "polished";
import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";

interface GraphDataSet {
    label: string;
    data: any[];
    borderColor: string;
    backgroundColor: string;
    yAxisID: string
}

interface GraphData {
    labels: string[];
    datasets: GraphDataSet[];
}

export const DataGraph = () => {
    const [energyData, setEnergyData] = useState<EnergyData[]>();
    const [weatherData, setWeatherData] = useState<WeatherData[]>();
    const [startDate, setStartDate] = useState<Date>(new Date("2020-01-01"));
    const [endDate, setEndDate] = useState<Date>(new Date("2020-01-07"));

    const maxDate = new Date("2020-01-31");

    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      
      const options = {
        // responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          tooltip: {
            callbacks: {
                title: (context: any) => {
                  const data = energyData && energyData[context[0].parsed.x];

                  return `${data && format(new Date(data.timestamp), "dd/MM/yyyy HH:mm")} ${data?.isAnomaly ? "(Anomaly)" : ""}`
                },
                label: (context: any) => {
                    let label: string = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y;
                    }

                    if (label.includes("Energy Consumption")) {
                      label += " kWh "
                    }
                    if (label.includes("Average Temperature")) {
                      label += " °C"
                    }

                    return label;
                },
                labelTextColor: (context: any) => {                  
                    if (context.dataset.label.includes("Anomaly")) {
                      return "#ff0000";
                    }
                    return '#FFFFFF';
                }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Energy Consumption (kWh)"
            },
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
          },
          y1: {
            title: {
              display: true,
              text: "Average Temperature (°C)"
            },
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
          },
          x: {
            title: {
              display: true,
              text: "Time of measurement"
            }
          }
        },
      };
      
    const handleGetEnergyData = async (startDate?: Date, endDate?: Date) => {
        const energyData = await getEnergyData(startDate, endDate).then((dt) => dt);
        setEnergyData(energyData)
    }

    const handleGetWeatherData = async (startDate?: Date, endDate?: Date) => {
        const weatherData = await getWeatherData(startDate, endDate).then((dt) => dt);
        setWeatherData(weatherData)
    }

    const handleOnStartDateChange = useEventCallback((value: Date | null) => {
      console.log(value);
      value && setStartDate(value);
    })

    const handleOnEndDateChange = useEventCallback((value: Date | null) => {
      console.log(value);
      value && setEndDate(value);
    })

    const graphData: GraphData | undefined = useMemo(() => energyData && weatherData && ({
        labels: energyData.map((data: EnergyData) => format(new Date(data.timestamp), "HH:mm") === "00:00" ? format(new Date(data.timestamp), "dd/MM/yyyy HH:mm") : format(new Date(data.timestamp), "HH:mm")),
        datasets: [
          {
            label: 'Energy Consumption',
            data: energyData.map((data: EnergyData) => data.consumption),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
            yAxisID: 'y',
            option: {
              tooltip: {
              }
            }
          },
          {
            label: 'Average Temperature',
            data: weatherData.map((data: WeatherData) => data.averageTemperature),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderWidth: 1,
            yAxisID: 'y1',
          },
        ],
      }), [energyData, weatherData]);

    const graphHasData = useMemo(() => energyData && energyData.length, [energyData])

    useEffect(() => {
        handleGetEnergyData(startDate, endDate);
        handleGetWeatherData(startDate, endDate);
    }, [startDate, endDate]);

    console.log(energyData);

    return (
        <Card>
          <CardHeader title="Graph" subheader="Select date range to refine search" />
          <CardContent>
              <Grid container width="100%">
                  <Grid xs={3} item>
                    <StyledDatePicker  label="Start date" onChange={handleOnStartDateChange} value={startDate} maxDate={maxDate} sx={{ border: `${rem(1)} black solid` }} />
                  </Grid>
                  <Grid xs={3} item>
                    <StyledDatePicker label="End date" onChange={handleOnEndDateChange} value={endDate} minDate={startDate} maxDate={maxDate} sx={{ border: `${rem(1)} black solid` }} />
                  </Grid>
                  <Grid xs={12} item padding={rem(20)}>
                    <Box justifyContent="center">
                      {graphHasData && graphData ? <Line height={rem(1800)} options={options} data={graphData} /> : <Typography>No data to show.</Typography>}
                      </Box>
                  </Grid>
              </Grid>
          </CardContent>
        </Card>
    )
}

const StyledDatePicker = styled(DatePicker<Date>)`
  .MuiInputBase-input {
    height: ${rem(2)};
  }
`