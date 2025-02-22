"use client";
import { faList, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import AlertError from "@/components/alert-error";
import Link from 'next/link';
import Modal from '@/components/modal';

export default function DataProcessedPage() {
  const [dataProcessed, setDataProcessed] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const beUrl = process.env.NEXT_PUBLIC_BE_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${beUrl}/api/data_processed?page=${currentPage}`);
      if (response.ok) {
        const data = await response.json();
        setDataProcessed(data);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('Error fetching data');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${beUrl}/api/data_processed/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Fetch the data again to update the table
        fetchData();
      } else {
        setError('Error deleting data');
      }
    } catch (error) {
      setError('Error deleting data');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  if (error) {
    return <AlertError message={error} />;
  }

  return (
    <div className='row'>
      <div className='col-12 mt-1'>
        <h1>
          <FontAwesomeIcon icon={faList} className="me-2" />
          Data Processed
        </h1>
      </div>
      <div className='col-12'>
        <div className="alert alert-info" role="alert">
          List of processed data.
        </div>
      </div>
      <div className='col-12'>
        {error && <p className="text-danger">{error}</p>}
        {dataProcessed && (
          <div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Company</th>
                  <th>Program</th>
                  <th>Eligibility</th>
                  <th>Detail</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(dataProcessed.results).map((key, index) => (
                  <tr key={index}>
                    <td>{dataProcessed.results[key].created}</td>
                    <td>{dataProcessed.results[key].processed_data?.details.program}</td>
                    <td>{dataProcessed.results[key].processed_data?.details.eligibility}</td>
                    <td>{dataProcessed.results[key].company?.slug}</td>
                    <td>
                      <Link
                        href={`/data_processed/${dataProcessed.results[key].id}`}
                        className="btn btn-primary"
                        title="Details"
                      >
                        <FontAwesomeIcon icon={faInfo}/>
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#deleteModal${dataProcessed.results[key].id}`}
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <Modal
                        id={`deleteModal${dataProcessed.results[key].id}`}
                        title="Delete Confirmation"
                        onClose={() => console.log('Modal closed')}
                        onConfirm={() => handleDelete(dataProcessed.results[key].id)}
                      >
                        Are you sure you want to delete this data processed?
                      </Modal>
                    </td>
                  </tr>
                ))}
                {Object.keys(dataProcessed.results).length == 0 && (
                  <tr>
                    <td colSpan="6">
                      <div className="alert alert-secondary" role="alert">
                        No data found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {dataProcessed.pagination.pages > 1 && (
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  {dataProcessed.pagination.pages > 1 && (
                    <li className="page-item">
                      <Link href="#" onClick={() => handlePageChange(1)} className="page-link">
                        First
                      </Link>
                    </li>
                  )}
                  {Array(dataProcessed.pagination.pages)
                    .fill(null)
                    .map((_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <Link href="#" onClick={() => handlePageChange(i + 1)} className="page-link">
                          {i + 1}
                        </Link>
                      </li>
                    ))}
                  {dataProcessed.pagination.pages > 1 && (
                    <li className="page-item">
                      <Link href="#" onClick={() => handlePageChange(dataProcessed.pagination.pages)} className="page-link">
                        Last
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
};