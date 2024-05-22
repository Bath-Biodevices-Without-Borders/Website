import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import './tabs.css';

import Tab from "./tab/tab";
import Content from "./content/content";

export default function Tabs(
  { tabsInfo } : { tabsInfo: { title: string; Component: React.FC }[] }
) {
  const [selected, setSelected] = useState<number|null>(null);
  const [dir, setDir] = useState<string|null>(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="nav-tabs"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
          delay: 2,
        },
      }}
    >
      <div>
        <Tab
          selected={null}
          handleSetSelected={() => {}}
          tab={null}
          haveChevron={false}
          link="/"
        >
          Home
        </Tab>
      </div>
      <div
        className="dropdown"
        ref={ref}
        onMouseLeave={() => handleSetSelected(null)}
      >
        {tabsInfo.map((t:{ title: string; Component: React.FC}, idx: number) => {
          return (
            <Tab
              key={idx + 1}
              selected={selected}
              handleSetSelected={handleSetSelected}
              tab={idx + 1}
              haveChevron={true}
              link={null}
            >
              {t.title}
            </Tab>
          );
        })}
        <AnimatePresence>
          {selected && <Content
            tabsInfo={tabsInfo}
            dir={dir}
            selected={selected}
            parentWidth={ref.current?.clientWidth}
          />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};