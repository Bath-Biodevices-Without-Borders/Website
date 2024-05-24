import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './content.css';

import Bridge from "./bridge/bridge";
import Nub from "./nub/nub";

import { I_navOptionsProps } from "../../../../types/types";

export default function Content(
  { 
    tabsInfo,
    selected,
    dir,
    parentWidth
  } : {
    tabsInfo: { title : string, Component : React.FC<I_navOptionsProps> }[],
    selected : number | null,
    dir : string | null,
    parentWidth : number | undefined
  }) {
  const [width, setWidth] = useState<number>(200);

  useEffect(() => {
    if (parentWidth) {
      setWidth(parentWidth);
    }
  }, [parentWidth])

  return (
    <motion.div
      id="nav-content-container"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      style={{width}}
    >
      <Bridge />
      <Nub selected={selected} />

      {tabsInfo.map((t : { title : string, Component : React.FC<I_navOptionsProps> }, idx: number) => {
        return (
          <div className="nav-content" key={idx + 1}>
            {selected === idx + 1 && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? width : dir === "r" ? (-1 * width) : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component handleClick={() => {}} navType={1} viewportRef={undefined}/>
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};