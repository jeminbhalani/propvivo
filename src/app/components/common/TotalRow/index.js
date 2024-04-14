import React from "react";
import styles from "../../../page.module.css";

function TotalRow({ dataSource, title }) {
  return (
    <div className={styles.totalCol}>
      <div>{title}</div>
      <div>
        $
        {dataSource?.reduce(
          (prev, curr) => curr.yearBeforePreviousBudget + prev,
          0
        ) || 0}
      </div>
      <div>
        $
        {dataSource?.reduce(
          (prev, curr) => curr.yearBeforePreviousActual + prev,
          0
        ) || 0}
      </div>
      <div>
        $
        {dataSource?.reduce(
          (prev, curr) => curr.previousYearBudget + prev,
          0
        ) || 0}
      </div>
      <div>
        $
        {dataSource?.reduce(
          (prev, curr) => curr.previousYearActual + prev,
          0
        ) || 0}
      </div>
      <div>
        $
        {dataSource?.reduce((prev, curr) => curr.projectionAmount + prev, 0) ||
          0}
      </div>
      <div>
        $
        {dataSource?.reduce((prev, curr) => curr.currentYearBudget + prev, 0) ||
          0}
      </div>
      <div>
        $
        {dataSource?.reduce(
          (prev, curr) => curr.increaseOrDecrease + prev,
          0
        ) || 0}
      </div>
    </div>
  );
}

export default TotalRow;
