import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';

const VehicleModels = React.lazy(() => import('./VehicleModels'));

export default function ResultPage() {
  const router = useRouter();
  const { makeId, year } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-500 via-gray-200 to-white">
      <h1 className="text-3xl font-bold mb-8">
        Vehicle Models for {makeId} ({year})
      </h1>
      <Suspense fallback={<div>Loading vehicle models...</div>}>
        {makeId && year && <VehicleModels makeId={makeId} year={year} />}
      </Suspense>
      <Link href={`/`}>
        <button className={`p-2 bg-blue-500 text-white rounded mt-5`}>
          Back
        </button>
      </Link>
    </div>
  );
}
