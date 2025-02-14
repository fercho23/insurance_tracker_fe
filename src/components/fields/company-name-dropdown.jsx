"use client";

import { useState } from 'react';

export default function CompanyNameDropdown({ companyNames, onCompanyChange, disabled=false }) {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedCompany(event.target.value);
    onCompanyChange(event.target.value);
  };

  return (
    <>
      <select
        className="form-select"
        onChange={handleOptionChange}
        aria-label="Select a company"
        disabled={disabled}
      >
        <option value=""> - Select a company - </option>
        {Object.keys(companyNames).map((key, index) => (
          <option key={index} value={key}>
            {companyNames[key]}
          </option>
        ))}
      </select>
    </>
  );
}