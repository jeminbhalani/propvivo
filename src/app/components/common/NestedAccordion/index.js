"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../../../page.module.css";
import CustomTable from "../Table";

function NestedAccordionHeader({
  defaultOpen,
  title,
  toggleAccordion,
  activekey,
  className,
}) {
  return (
    <div className={className} onClick={() => toggleAccordion(activekey)}>
      <span>{title}</span>
      <span>
        <Image
          src="/collapse.png"
          className={defaultOpen[activekey] ? styles.collapse : styles.collapseRotate}
          width={16}
          height={16}
          alt="Close Icon"
        />
      </span>
    </div>
  );
}

export default NestedAccordionHeader;
