"use client";

import classes from './page.module.css';
import UploadFileForm from '@/components/UploadFileForm';
import CompanyNameDropdown from '@/components/fields/company-name-dropdown';
import { useState } from 'react';

const companyNames = {
  "dupixent": "Dupixent",
  "company_do_not_exist": "Company do not exist",
};

export default function ImportPage() {
  const [companyName, setCompanyName] = useState(null);
  const beUrl = process.env.NEXT_PUBLIC_BE_URL

  const handleCompanyChange = (companyName) => {
    setCompanyName(companyName)
  };

  return (
    <>
      <main>
        <section className={classes.section}>
          <h2>Import</h2>
          <p>Here you can select a file to import.</p>
          <div className="alert alert-info" role="alert">
            Once the process is finished you will be redirected to the list of processed data.
          </div>
          <div className="row">
            <div className="col">
              <CompanyNameDropdown
                companyNames={companyNames}
                onCompanyChange={handleCompanyChange}
              />
            </div>
            <div className="col">
              {companyName && (
                <UploadFileForm
                  urlToUpload={`${beUrl}/api/process/${companyName}`}
                  redirectUrl="/data_processed"
                />
              )}
              {!companyName && (
                <div className="alert alert-warning" role="alert">
                  First select a company in the dropdown.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}