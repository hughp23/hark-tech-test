namespace HarkTechTest_BE.Models.Dtos
{
    public class EnergyConsumptionData
    {
        /// <summary>
        /// Timestamp of data recording
        /// </summary>
        public DateTime Timestamp { get; set; }
        /// <summary>
        /// Energy consumption
        /// </summary>
        public decimal Consumption { get; set; }

        public static EnergyConsumptionData FromCsv(string csvLine)
        {
            string[] values = csvLine.Split(',');

            EnergyConsumptionData energyConsumption = new()
            {
                Timestamp = Convert.ToDateTime(values[0]),
                Consumption = Convert.ToDecimal(values[1]),
            };

            return energyConsumption;
        }
    }
}
