import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";

type Props = {
	params: {
		city: string;
		lat: string;
		long: string;
	};
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
	const client = getClient();

	const { data } = await client.query({
		query: fetchWeatherQuery,
		variables: {
			current_weather: "true",
			longitude: long,
			latitude: lat,
			timezone: "GMT",
		},
	});

	const results: Root = data.myQuery;

	return (
		<div>
			{/* <InformationPanel /> */}

			<div>
				<div className="pb-5">
					<div className="pb-5">
						<h2 className="text-xl font-bold">Todays Overview</h2>
						<p className="text-sm text-gray-400">
							Last Update at:{" "}
							{new Date(results.current_weather.time).toLocaleString()} (
							{results.timezone})
						</p>
					</div>

					<div>
						<CalloutCard message="This is where GPT-4 Summary will go" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default WeatherPage;
