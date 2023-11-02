using HarkTechTest_BE.Models.Dtos;
using HarkTechTest_BE.Models.Requests;
using HarkTechTest_BE.Models.Responses;
using MediatR;

namespace HarkTechTest_BE.Handlers
{
    public class EnergyDataRequestHandler : IRequestHandler<EnergyDataRequest, IEnumerable<EnergyDataResponse>>
    {
        public async Task<IEnumerable<EnergyDataResponse>> Handle(EnergyDataRequest request, CancellationToken cancellationToken)
        {
            // Data could be read from SQL DB
            // File path could be read from appsettings
            List<EnergyConsumptionData> energyConsumption = File.ReadAllLines("C:\\Users\\hughp\\source\\repos\\HarkTechTest-BE\\HarkTechTest-BE\\DataSource\\HalfHourlyEnergyData.csv")
                .Skip(1)
                .Select(x => EnergyConsumptionData.FromCsv(x))
                .ToList();

            List<EnergyConsumptionData> energyConsumptionAnomalies = File.ReadAllLines("C:\\Users\\hughp\\source\\repos\\HarkTechTest-BE\\HarkTechTest-BE\\DataSource\\HalfHourlyEnergyDataAnomalies.csv")
                .Skip(1)
                .Select(x => EnergyConsumptionData.FromCsv(x))
                .ToList();

            // join both data sets to identify anomalies
            IEnumerable<EnergyDataResponse> energyData = (from ec in energyConsumption
                                               join eca in energyConsumptionAnomalies on ec.Timestamp equals eca.Timestamp into lj1
                                               from subEca in lj1.DefaultIfEmpty()
                                               select new EnergyDataResponse
                                               {
                                                   Timestamp = ec.Timestamp,
                                                   Consumption = ec.Consumption,
                                                   IsAnomaly = lj1.Any()
                                               })
                                               .Where(x => ((request.StartDate != null && x.Timestamp.Date >= request.StartDate) || request.StartDate == null) && ((request.EndDate != null && x.Timestamp.Date <= request.EndDate) || request.EndDate == null))
                                               .AsEnumerable();

            return energyData;
        }
    }
}
