import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import './nub.css';


export default function Nub({ selected } : { selected: number|null}) {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  }, [selected]);

  return (
    <motion.span
      className="nav-nub"
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    />
  );
};