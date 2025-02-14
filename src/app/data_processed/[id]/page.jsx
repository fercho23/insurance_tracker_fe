"use client";
import { useEffect, useState } from 'react';

export default function DataProcessedDetail({ params }) {
  const [dataProcessed, setDataProcessed] = useState(null);
  const [error, setError] = useState(null);
  const beUrl = process.env.NEXT_PUBLIC_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${beUrl}/api/data_processed/${params.id}`);
        const data = await response.json();
        setDataProcessed(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="alert alert-danger">
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Processed Details</h5>
              {dataProcessed ? (
                <>
                  <p className="card-text">
                    <strong>Created:</strong> {dataProcessed.created}
                  </p>
                  <p className="card-text">
                    <strong>Program:</strong> {dataProcessed.processed_data?.details.program}
                  </p>
                  <p className="card-text">
                    <strong>Eligibility:</strong> {dataProcessed.processed_data?.details.eligibility}
                  </p>
                  <p className="card-text">
                    <strong>Company:</strong> {dataProcessed.company?.slug}
                  </p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
