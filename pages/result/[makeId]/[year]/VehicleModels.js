import React from 'react';

export async function fetchVehicleModels(makeId, year) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await response.json();
  return data.Results;
}

export default function VehicleModels({ makeId, year }) {
  const [models, setModels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVehicleModels(makeId, year);
        setModels(data);
      } catch (err) {
        setError('Failed to fetch vehicle models');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [makeId, year]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul className="list-disc ">
      {models.map((model) => (
        <li key={model.Model_ID} className="text-lg">
          {model.Model_Name}
        </li>
      ))}
    </ul>
  );
}
