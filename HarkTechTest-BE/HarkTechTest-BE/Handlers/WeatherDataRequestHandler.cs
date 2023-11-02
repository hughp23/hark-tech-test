using HarkTechTest_BE.Models.Requests;
using HarkTechTest_BE.Models.Responses;
using MediatR;

namespace HarkTechTest_BE.Handlers
{
    public class WeatherDataRequestHandler : IRequestHandler<WeatherDataRequest, IEnumerable<WeatherDataResponse>>
    {
        public async Task<IEnumerable<WeatherDataResponse>> Handle(WeatherDataRequest request, CancellationToken cancellationToken)
        {
            // read csvs into dto
            IEnumerable<WeatherDataResponse> weatherData = File.ReadAllLines("C:\\Users\\hughp\\source\\repos\\HarkTechTest-BE\\HarkTechTest-BE\\DataSource\\Weather.csv")
                .Skip(1)
                .Select(csvLine => {
                    string[] values = csvLine.Split(',');
                    return new WeatherDataResponse
                    {
                        Date = Convert.ToDateTime(values[0].ToString()),
                        AverageTemperature = Convert.ToDecimal(values[1]),
                    };
                })
                .Where(x => ((request.StartDate != null && x.Date.Date >= request.StartDate) || request.StartDate == null) && ((request.EndDate != null && x.Date.Date <= request.EndDate) || request.EndDate == null))
                .AsEnumerable();

            return weatherData;
        }
    }
}
