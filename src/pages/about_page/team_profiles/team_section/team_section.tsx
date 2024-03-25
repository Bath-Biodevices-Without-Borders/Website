import React from "react";
import "./team_section.css";

import Profile from './profile/profile';

type T_teamMember = {
  Id: number;
  Email: string;
  Name: string;
  Course: string;
  Link: string;
  Description: string;
  Image: string | any;
  Roles: {
      Role: string;
      Team: string;
  }[];
  Legacy: boolean;
  Lead: string;
};

export default function TeamSection(props: any) {
  let counter: number = 0;

  return (
    <div className='team'>
      <header>
        <figure>
          <img src={props.icon} alt={props.teamName + " icon"} />
        </figure>
        <aside>
          <h3>{props.teamName}</h3>
          <p>{props.description}</p>
        </aside>
      </header>
      <div className='team-profiles'>
        {
          props.members.map((teamMember: T_teamMember, index: number) => {
            counter++;
            return <Profile
              key={index}
              index={props.index * 100 + index}
              isSelected={props.selectedIndex === props.index * 100 + index}
              handleSelection={props.handleSelection}
              isLead={teamMember.Lead === props.teamName}
              team={props.teamName}
              {...teamMember}
            />;
          })
        }
        { props.showLegacy && props.legacyMembers.map((
            teamMember: T_teamMember,
            index: number
          ) => {
            return <Profile
              key={index}
              index={props.index * 100 + index + counter}
              isSelected={props.selectedIndex === props.index * 100 + index + counter}
              handleSelection={props.handleSelection}
              isLead={teamMember.Lead === props.teamName}
              team={props.teamName}
              {...teamMember}
            />;
          })
        }
      </div>
    </div>
  );
}
