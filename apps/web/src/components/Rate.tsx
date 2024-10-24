import useConversionRate from "@/hooks/conversionRate";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Rate() {
  const { isPending, data, isFetching, failureReason } = useConversionRate();
  const hasError = failureReason !== null;

  let content;

  if (hasError) {
    content = <div className="error">An error has occurred</div>;
  } else if (isPending || isFetching) {
    content = (
      <div className="loading">
        <Skeleton width="310px" height="70px" />
      </div>
    );
  } else if (data) {
    content = (
      <div className="data">
        <p id="conversion-rate" className="rate">
          1 ETH = {data.conversionRate} pufETH
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">{content}</div>
    </div>
  );
}
