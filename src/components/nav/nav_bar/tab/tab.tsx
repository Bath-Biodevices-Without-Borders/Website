import './tab.css';

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Tab(
  { 
    children,
    tab,
    handleSetSelected,
    selected,
    haveChevron,
    link
  } : {
    children : any,
    tab : number | null,
    handleSetSelected : (val: number | null) => void,
    selected : number | null,
    haveChevron : boolean,
    link : string | null
  }
) {

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (selected === null && tab === null) {
      setActive(false);
    } else {
      setActive(selected === tab);
    }
  }, [selected, tab]);

  const handleEnter = () => {
    if (haveChevron) {
      handleSetSelected(tab);
    } else {
      setActive(true);
    }
  }

  const handleLeave = () => {
    if (!haveChevron) {
      setActive(false);
    }
  }

  return (
    <NavLink
      to={link ? link : ""}
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleEnter()}
      onClick={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
      className={`nav-tab-button ${active ? "nav-tab-button-active" : "nav-tab-button-deactive"}`}
    >
      <span>{children}</span>
      {haveChevron && <FontAwesomeIcon
        icon={faChevronDown}
        className={`nav-tab-chevron ${active ? "nav-tab-chevron-active" : "nav-tab-chevron-deactive"}`}
      />}
    </NavLink>
  );
};