import useConversionRate from "@/hooks/conversionRate";
import React from "react";

export default function Rate() {
  const { isPending, error, data, isFetching } = useConversionRate();

  return (
    <div className="container">
      <div className="card">
        {isPending && <div className="loading">Loading...</div>}
        {error && (
          <div className="error">An error has occurred: {error.message}</div>
        )}
        {data && (
          <div className="data">
            <h2 className="title">Conversion Rate</h2>
            <p className="rate">{data.conversionRate}</p>
            {isFetching && <div className="fetching">Updating...</div>}
          </div>
        )}
      </div>
    </div>
  );
}
