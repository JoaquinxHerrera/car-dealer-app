import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const fetchVehicleTypes = async () => {
    const response = await fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );
    const data = await response.json();
    setVehicleTypes(data.Results);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(currentYear - 2014),
    (val, index) => currentYear - index
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-400 to-gray-100">
      <h1 className="text-4xl font-bold mb-8">Car Dealer App</h1>
      <div className="flex flex-col items-center space-y-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          onFocus={fetchVehicleTypes}
        >
          <option value="">Select Vehicle Type</option>
          {vehicleTypes.map((type) => (
            <option key={type.MakeId} value={type.MakeId}>
              {type.MakeName}
            </option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Model Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <Link
          href={
            selectedType && selectedYear
              ? `/result/${selectedType}/${selectedYear}`
              : '#'
          }
        >
          <button
            className={`p-2 bg-blue-500 text-white rounded ${!selectedType || !selectedYear ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedType || !selectedYear}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
