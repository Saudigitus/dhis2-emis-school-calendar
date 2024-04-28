import React from "react";
import EnrollmentFilters from "../filters/enrollment/EnrollmentFilters";

function HeaderFilters() {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <EnrollmentFilters />
    </div>
  );
}

export default HeaderFilters;
