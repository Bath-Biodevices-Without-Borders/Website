import './tab.css';

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Tab(
  { 
    children,
    tab,
    handleSetSelected,
    selected 
  } : {
    children : any,
    tab : number,
    handleSetSelected : (val: number | null) => void,
    selected : number | null
  }
) {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`nav-tab-button ${selected === tab ? "nav-tab-button-active" : "nav-tab-button-deactive"}`}
    >
      <span>{children}</span>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`nav-tab-chevron ${selected === tab ? "nav-tab-chevron-active" : "nav-tab-chevron-deactive"}`}
      />
    </button>
  );
};