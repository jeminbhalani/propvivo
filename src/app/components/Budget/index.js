"use client";
import React, { useEffect, useState } from "react";
import styles from "../../page.module.css";
import CustomTable from "../common/Table";
import budgetData from "../../../../budgetData.json";
import NestedAccordionHeader from "../common/NestedAccordion";
import { InputNumber } from "antd";

function Accordion({ defaultOpen, setDefaultOpen }) {
  const [budgetArr, setBudgetArr] = useState([]);
  const toggleAccordion = (name) => {
    setDefaultOpen({ ...defaultOpen, [name]: !defaultOpen[name] });
  };

  useEffect(() => {
    setBudgetArr(budgetData);
  }, []);

  function groupByAccountSubHeader(data) {
    return data.reduce((groupedData, item) => {
      const subHeader = item.accountSubHeader;
      if (!groupedData[subHeader]) {
        groupedData[subHeader] = [];
      }
      groupedData[subHeader].push(item);
      return groupedData;
    }, {});
  }

  const handleChange = (value, id) => {
    const updatedDataSource = budgetArr.map((item) => {
      if (item.id === id) {
        return { ...item, currentYearBudget: value || 0 };
      }
      return item;
    });
    setBudgetArr(updatedDataSource);
  };

  const groupedBySubHeader = groupByAccountSubHeader(
    budgetArr.filter((x) => x?.accountSubHeader)
  );

  let tableCol = [
    {
      title: "GL Code",
      dataIndex: "glCode",
      key: "glCode",
      width: "12%",
      sorter: (a, b) => a.glCode.localeCompare(b.glCode),
    },
    {
      title: "GL name",
      dataIndex: "name",
      key: "name",
      width: "12%",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "2022 Budget",
      dataIndex: "yearBeforePreviousBudget",
      width: "10%",
      key: "yearBeforePreviousBudget",
      sorter: (a, b) => a.yearBeforePreviousBudget - b.yearBeforePreviousBudget,
    },
    {
      title: "2022 Actuals",
      dataIndex: "yearBeforePreviousActual",
      key: "yearBeforePreviousActual",
      width: "10%",
      sorter: (a, b) => a.yearBeforePreviousActual - b.yearBeforePreviousActual,
    },
    {
      title: "2023 Budget",
      dataIndex: "previousYearBudget",
      key: "previousYearBudget",
      width: "10%",
      sorter: (a, b) => a.previousYearBudget - b.previousYearBudget,
    },
    {
      title: "2023 Actuals(Till July)",
      dataIndex: "previousYearActual",
      key: "previousYearActual",
      width: "12%",
      sorter: (a, b) => a.previousYearActual - b.previousYearActual,
    },
    {
      title: "2023 Projection",
      dataIndex: "projectionAmount",
      key: "projectionAmount",
      width: "10%",
      sorter: (a, b) => a.projectionAmount - b.projectionAmount,
    },
    {
      title: "2023 Budget",
      dataIndex: "currentYearBudget",
      key: "currentYearBudget",
      width: "12%",
      render: (text, record) => {
        if (record.isTotalIncome) {
          return text;
        } else {
          return (
            <InputNumber
              min={0}
              value={text}
              onChange={(value) => handleChange(value, record.id)}
            />
          );
        }
      },
      sorter: (a, b) => a.currentYearBudget - b.currentYearBudget,
    },
    {
      title: "Increase/Decrease Over 2023 Budget",
      dataIndex: "increaseOrDecrease",
      key: "increaseOrDecrease",
      width: "12%",
      sorter: (a, b) => a.increaseOrDecrease - b.increaseOrDecrease,
    },
  ];

  let assessmentArr = [
    {
      isTotalIncome: true,
      accountType: "LineItem",
      id: "cca8d07e-04d9-4014-b829-3ce4763675432783",
      name: "Regular Assessment Income",
      glCode: "410000",
      mainAccountId: "fd36fba2-de49-4a55-8a40-08e671af4457",
      mainAccount: "INCOME",
      accountHeaderId: "345cdd08-ba83-492b-9435-b057fb16bd93",
      accountHeader: "OPERATING INCOME",
      accountSubHeaderId: "8cb4e8f5-4e37-4553-a495-bd51b214db89",
      accountSubHeader: "ASSESSMENTS",
      parentGroup: "8cb4e8f5-4e37-4553-a495-bd51b214db89",
      parentGroupName: "ASSESSMENTS",
      yearBeforePreviousActual:
        budgetArr?.reduce(
          (prev, curr) => curr.yearBeforePreviousActual + prev,
          0
        ) || 0,
      yearBeforePreviousBudget:
        budgetArr?.reduce(
          (prev, curr) => curr.yearBeforePreviousBudget + prev,
          0
        ) || 0,
      previousYearActual:
        budgetArr?.reduce((prev, curr) => curr.previousYearActual + prev, 0) ||
        0,
      previousYearBudget:
        budgetArr?.reduce(
          (prev, curr) => curr.yearBeforePreviousBudget + prev,
          0
        ) || 0,
      currentYearActual:
        budgetArr?.reduce((prev, curr) => curr.currentYearActual + prev, 0) ||
        0,
      currentYearBudget:
        budgetArr?.reduce((prev, curr) => curr.currentYearBudget + prev, 0) ||
        0,
      projectionAmount:
        budgetArr?.reduce((prev, curr) => curr.projectionAmount + prev, 0) || 0,
      budgetAmount:
        budgetArr?.reduce((prev, curr) => curr.budgetAmount + prev, 0) || 0,
      increaseOrDecrease:
        budgetArr?.reduce((prev, curr) => curr.increaseOrDecrease + prev, 0) ||
        0,
    },
    ...(groupedBySubHeader?.ASSESSMENTS ?? []),
  ];

  return (
    <>
      <div className={styles.accordion}>
        <NestedAccordionHeader
          defaultOpen={defaultOpen}
          toggleAccordion={toggleAccordion}
          activekey={"revenue"}
          title={"Revenue"}
          className={styles.accordionGrandHeader}
        />
        {defaultOpen.revenue && (
          <div className={styles.accordionContent}>
            <div className={styles.nestedAccordion}>
              <NestedAccordionHeader
                defaultOpen={defaultOpen}
                toggleAccordion={toggleAccordion}
                activekey={"revenueOperatingIncome"}
                title={"Operating Income"}
                className={`${styles.accordionGrandHeader} ${styles.accordionHeader}`}
              />
              {defaultOpen?.revenueOperatingIncome && (
                <div className={styles.accordionContent}>
                  <div className={styles.nestedAccordion}>
                    <NestedAccordionHeader
                      defaultOpen={defaultOpen}
                      toggleAccordion={toggleAccordion}
                      activekey={"revenueTable"}
                      title={"Assessment"}
                      className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                    />
                    {defaultOpen?.revenueTable && (
                      <CustomTable
                        title={"Total Revenue"}
                        dataSource={assessmentArr}
                        columns={tableCol}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.accordion}>
        <NestedAccordionHeader
          defaultOpen={defaultOpen}
          toggleAccordion={toggleAccordion}
          activekey={"expense"}
          title={"Expense"}
          className={styles.accordionGrandHeader}
        />
        {defaultOpen.expense && (
          <div className={styles.accordionContent}>
            <div className={styles.nestedAccordion}>
              <NestedAccordionHeader
                defaultOpen={defaultOpen}
                toggleAccordion={toggleAccordion}
                activekey={"operatingExpense"}
                title={"Operating Expense"}
                className={`${styles.accordionGrandHeader} ${styles.accordionHeader}`}
              />
              {defaultOpen?.operatingExpense && (
                <>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"administrativeExpense"}
                        title={"Administrative Expense"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.administrativeExpense && (
                        <CustomTable
                          title={"Total Administrative Expenses"}
                          dataSource={
                            groupedBySubHeader?.["ADMINISTRATIVE EXPENSES"]
                          }
                          columns={tableCol}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"taxExpense"}
                        title={"Tax Expense"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.taxExpense && (
                        <CustomTable
                          title={"Total Tax Expenses"}
                          dataSource={groupedBySubHeader?.["TAX EXPENSES"]}
                          columns={tableCol}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"insuranceExpense"}
                        title={"Insurance Expense"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.insuranceExpense && (
                        <CustomTable
                          title={"Total Insurance Expenses"}
                          dataSource={
                            groupedBySubHeader?.["INSURANCE EXPENSES"]
                          }
                          columns={tableCol}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"professionalExpense"}
                        title={"Professional Expense"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.professionalExpense && (
                        <CustomTable
                          title={"Total Professional Expenses"}
                          dataSource={
                            groupedBySubHeader?.["PROFESSIONAL EXPENSES"]
                          }
                          columns={tableCol}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"landscapeAndAmenitiesExpenses"}
                        title={"Landscape & Amenities Expenses"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.landscapeAndAmenitiesExpenses && (
                        <CustomTable
                          title={"Totel Landscape Expenses"}
                          dataSource={
                            groupedBySubHeader?.[
                              "LANDSCAP AND AMENITIES EXPENSES"
                            ]
                          }
                          columns={tableCol}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"maintenanceExpenses"}
                        title={"Maintenance Expenses"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.maintenanceExpenses && (
                        <CustomTable
                          title={"Total Maintenance Expenses"}
                          dataSource={
                            groupedBySubHeader?.["MAINTENANCE EXPENSES"]
                          }
                          columns={tableCol}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"totalUtilityExpenses"}
                        title={"Total Utility Expenses"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.totalUtilityExpenses && (
                        <CustomTable
                          title={"Total Utility Expenses"}
                          dataSource={groupedBySubHeader?.["UTILITY EXPENSES"]}
                          columns={tableCol}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"totalOperatingExpenses"}
                        title={"Total Operating Expenses"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.totalOperatingExpenses && (
                        <CustomTable
                          title={"Total Operating Expenses"}
                          dataSource={
                            groupedBySubHeader?.["OPERATING EXPENSES"]
                          }
                          columns={tableCol}
                          expenseArr={budgetArr.filter(
                            (x) =>
                              x.accountHeader === "OPERATING EXPENSES" &&
                              x.accountSubHeader !== "RESERVE EXPENSES"
                          )}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.accordionContent}>
                    <div className={styles.nestedAccordion}>
                      <NestedAccordionHeader
                        defaultOpen={defaultOpen}
                        toggleAccordion={toggleAccordion}
                        activekey={"totalReserveContribution"}
                        title={"Total Reserve Contribution"}
                        className={`${styles.accordionGrandHeader} ${styles.accordionChildHeader}`}
                      />
                      {defaultOpen?.totalReserveContribution && (
                        <CustomTable
                          title={"Total Reserve Contribution"}
                          dataSource={groupedBySubHeader?.["RESERVE EXPENSES"]}
                          columns={tableCol}
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className={`${styles.accordionGrandHeader} ${styles.accordionHeader}`}
      >
        <span>{"Total Operating Expense"}</span>
        <span>
          $
          {budgetArr
            .filter((x) => x.accountHeader === "OPERATING EXPENSES")
            ?.reduce((prev, curr) => curr.currentYearBudget + prev, 0) || 0}
        </span>
      </div>
      <div className={styles.accordionGrandHeader}>
        <span>{"Total Expense"}</span>
        <span>
          $
          {budgetArr?.reduce(
            (prev, curr) => curr.currentYearBudget + prev,
            0
          ) || 0}
        </span>
      </div>
    </>
  );
}
function Budget() {
  const [defaultOpen, setDefaultOpen] = useState({
    revenue: true,
    revenueOperatingIncome: true,
    revenueTable: true,
    expense: true,
    operatingExpense: true,
    administrativeExpense: true,
    taxExpense: true,
    insuranceExpense: true,
    professionalExpense: true,
    landscapeAndAmenitiesExpenses: true,
    maintenanceExpenses: true,
    totalUtilityExpenses: true,
    totalOperatingExpenses: true,
    totalReserveContribution: true,
  });

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <h1 className={styles.header}>Wind Flower Heights Budget 2024</h1>
      <Accordion defaultOpen={defaultOpen} setDefaultOpen={setDefaultOpen} />
    </>
  );
}

export default Budget;
