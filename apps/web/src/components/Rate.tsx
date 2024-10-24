import useConversionRate from "@/hooks/conversionRate";
import React from "react";

export default function Rate() {
  const { isPending, data, isFetching, failureReason } = useConversionRate();
  const hasError = failureReason !== null; // isError is not reliable based on integration tests

  return (
    <div className="container">
      <div className="card">
        {isPending && !hasError && <div className="loading">Loading...</div>}
        {hasError && <div className="error">An error has occurred</div>}
        {data && (
          <div className="data">
            <p id="conversion-rate" className="rate">
              1 ETH = {data.conversionRate} pufETH
            </p>
            {isFetching && <div className="fetching">Updating...</div>}
          </div>
        )}
      </div>
    </div>
  );
}
