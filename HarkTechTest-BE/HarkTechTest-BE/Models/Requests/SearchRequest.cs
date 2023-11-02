namespace HarkTechTest_BE.Models.Requests
{
    public class SearchRequest
    {
        /// <summary>
        /// Start date of search filter
        /// </summary>
        public DateTime? StartDate { get; set; }
        /// <summary>
        /// End date of search filter
        /// </summary>
        public DateTime? EndDate { get; set; }
    }
}
