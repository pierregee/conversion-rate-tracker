import useConversionRate from "@/hooks/conversionRate";
import React from "react";

export default function Rate() {
  const { isPending, data, isFetching, failureReason } = useConversionRate();
  const hasError = failureReason !== null; // isError is not reliable based on integration tests

  console.log({ failureReason });
  return (
    <div className="container">
      <div className="card">
        {isPending && !hasError && <div className="loading">Loading...</div>}
        {hasError && <div className="error">An error has occurred</div>}
        {data && (
          <div className="data">
            <h2 className="title">Conversion Rate</h2>
            <p id="conversion-rate" className="rate">
              {data.conversionRate}
            </p>
            {isFetching && <div className="fetching">Updating...</div>}
          </div>
        )}
      </div>
    </div>
  );
}
