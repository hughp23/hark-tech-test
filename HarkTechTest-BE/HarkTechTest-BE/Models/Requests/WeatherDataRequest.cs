using HarkTechTest_BE.Models.Responses;
using MediatR;

namespace HarkTechTest_BE.Models.Requests
{
    public class WeatherDataRequest : SearchRequest, IRequest<IEnumerable<WeatherDataResponse>>
    {
    }
}
