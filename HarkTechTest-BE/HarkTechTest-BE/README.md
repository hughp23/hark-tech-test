Full-Stack Software Engineer Technical Test

User Story

I am an energy manager who would like to understand my labs energy usage in more
detail than I am previously used to so that I can identify areas in which I can reduce my
consumption and save money, as well as reduce my carbon usage.

I have my energy usage being monitored by the Hark Platform as well as the temperature
of my facility. My energy consumption is being run through a set of analytic pipelines
which will detect anomalies.

My energy consumption data is in half-hour intervals and the temperature data may be
infrequent. Anomalies detected could be at any point in my graph.

I would like to be able to cross reference my energy consumption with my temperature
data, and also be able to see which at which points in my data are anomalies.

When hovering over my points in the graph, I would like to be able to see the current
temperature at that time as well as my energy consumption. If there is an anomaly
detected at that point, it should also be present in the graphs tooltip.

Technical Notes

We have provided you with a set of energy consumption data, temperature data and
potential anomalies. We would like to have the data available over an API and retrieved by
a React front-end that displays the graph to solve the energy managers problem
described above.

We are happy for you to choose the technologies you use (minus those mentioned above)
however for reference at Hark we use C#, Highcharts, TypeScript and GraphQL to solve
these problems.

If you’d like to extend the specification above, we’d love to see some extra features that
you could build on top of the data we have provided. This could include some summary
metrics, graphing options and configuration.


**Improvements if more time**

- Add authorisation using API key
- Add validation on request model and return 400 if it fails. Can use FluentValidation for this
- Add data to SQL DB and read into Dto before using a mapper to return response model

Unit tests
	
Energy Data Handler
	- Successful search with date range returns data without anomalies
	- Successful search with date range returns data with anomalies
	- Invalid search request returns validation exception (Multiple examples)