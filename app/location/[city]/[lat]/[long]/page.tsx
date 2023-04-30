import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import StatCard from "@/components/StatCard";
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

					<div className="m-2 mb-10">
						<CalloutCard message="This is where GPT-4 Summary will go" />
					</div>

					<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
						<StatCard
							title="Maximum Temperature"
							metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
							color="yellow"
						/>

						<StatCard
							title="Minimum Temperature"
							metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
							color="green"
						/>

						<div>
							<StatCard
								title="UV Index"
								metric={results.daily.uv_index_max[0].toFixed(1)}
								color="rose"
							/>
							{Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
								<CalloutCard
									message={"The UV is high today, be sure to wear SPF!"}
									warning
								/>
							)}
						</div>

						<div className="flex space-x-3">
							<StatCard
								title="Wind Speed"
								metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
								color="cyan"
							/>

							<StatCard
								title="Wind Direction"
								metric={`${results.current_weather.winddirection.toFixed(1)}°`}
								color="violet"
							/>
						</div>
					</div>
				</div>

				<hr className="mb-5" />

				<div className="space-y-3">
					{/* TempChart */}
					{/* RainChart */}
					{/* HumidityChart */}
				</div>
			</div>
		</div>
	);
}

export default WeatherPage;
