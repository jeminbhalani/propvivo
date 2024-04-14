"use client";
import { Table } from "antd";
import React from "react";
import styles from "../../../page.module.css";
import TotalRow from "../TotalRow";

const CustomTable = ({ dataSource, columns, title, expenseArr }) => {
  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <TotalRow
        dataSource={dataSource}
        title={title}
      />
      {expenseArr && <TotalRow dataSource={expenseArr} title={title} />}
    </>
  );
};
export default CustomTable;
