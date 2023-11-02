namespace HarkTechTest_BE.Models.Responses
{
    public class WeatherDataResponse
    {
        /// <summary>
        /// Datetime of recording
        /// </summary>
        public DateTime Date { get; set; }
        /// <summary>
        /// Average temperature at time of recording
        /// </summary>
        public decimal AverageTemperature { get; set; }
    }
}
