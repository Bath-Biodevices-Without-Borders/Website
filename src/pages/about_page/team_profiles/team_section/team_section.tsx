import React from "react";
import "./team_section.css";

import { I_teamSectionProps, T_teamMember, T_role } from "../../../../types/types";

import Profile from './profile';

export default function TeamSection(props: I_teamSectionProps) {
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
            const teamRole: T_role | undefined = teamMember.roles.find((role: T_role) => {
              return role.team === props.teamName
            });
            const isLead: boolean = teamRole?.lead || false;
            return <Profile
              key={teamMember.id}
              index={teamMember.id}
              isSelected={props.selectedIndex === teamMember.id}
              handleSelection={props.handleSelection}
              isLead={isLead}
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
              index={teamMember.id}
              isSelected={props.selectedIndex === teamMember.id}
              handleSelection={props.handleSelection}
              isLead={false}
              team={props.teamName}
              {...teamMember}
            />;
          })
        }
      </div>
    </div>
  );
}
