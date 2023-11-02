namespace HarkTechTest_BE.Models.Responses
{
    public class EnergyDataResponse
    {
        /// <summary>
        /// Timestamp of data recording
        /// </summary>
        public DateTime Timestamp { get; set; }
        /// <summary>
        /// Energy consumption
        /// </summary>
        public decimal Consumption { get; set; }
        /// <summary>
        /// Is data point an anomaly
        /// </summary>
        public bool IsAnomaly { get; set; }
    }
}
