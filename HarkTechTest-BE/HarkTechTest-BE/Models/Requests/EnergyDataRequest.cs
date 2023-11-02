using HarkTechTest_BE.Models.Responses;
using MediatR;

namespace HarkTechTest_BE.Models.Requests
{
    public class EnergyDataRequest : SearchRequest, IRequest<IEnumerable<EnergyDataResponse>>
    {
    }
}
