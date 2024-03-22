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
  return (
    <div className='team'>
      <h3>{props.teamName}</h3>
      <div className='team-profiles'>
        {
          props.teamMembers.map((teamMember: T_teamMember, index: number) => {
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
      </div>
    </div>
  );
}
