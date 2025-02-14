"use client";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import AlertError from "@/components/alert-error";

export default function DataProcessedDetail() {
  const params = useParams();
  const [dataProcessed, setDataProcessed] = useState(null);
  const [error, setError] = useState(null);
  const beUrl = process.env.NEXT_PUBLIC_BE_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${beUrl}/api/data_processed/${params.id}`);
      // const data = await response.json();
      // setDataProcessed(data);
      if (response.ok) {
        const data = await response.json();
        setDataProcessed(data);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <AlertError message={error} />;
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-header">
            <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
            Data Processed Details
          </div>
          <div className="card-body">
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
  );
}
