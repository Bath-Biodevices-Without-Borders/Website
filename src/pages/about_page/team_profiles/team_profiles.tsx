import React from 'react'
import './team_profiles.css'

import Profile from './profile/profile';

import teamDetails from '../../../content/team_details.json'

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
};

/**
 * Renders the team profiles section.
 * Fetches team member details and their images.
 * 
 * @returns The rendered team profiles section.
 */
export default function TeamProfiles() {
    const [teamMembers, setTeamMembers] = React.useState<T_teamMember[]>([])

    React.useEffect(() => {
        const newTeamDetails: T_teamMember[] = teamDetails 

        // This Method is used to import all images from the team_profiles
        // folder and match them to the correct team member based on the email

        // The first part of this method is require.context which is a webpack
        // method that allows you to require all files that match a certain
        // pattern.
        let r = require.context(
            '../../../images/team_profiles/',
            false,
            /\.(png|jpe?g|svg)$/
        )

        // This method is used to map over all the images that have been imported
        // and match them to the correct team member based on the email as the
        // image name is the same as the email; excluding the email handler.
        r.keys().map((item: string, _) => {
            // This is used to get the username from the image name
            const username = item.replace('./', '').replace(/\.[^/.]+$/, '');
            // This is used to get the email from the username
            const email = `${username}@bath.ac.uk`
            // This is used to find the index of the team member that has the same
            // email as the image name
            const index = newTeamDetails.findIndex((member) => {
                return member.Email === email
            });
            // This is used to set the image of the team member to the image that
            // has been imported
            if (index !== -1) {
                newTeamDetails[index].Image = r(item)
            }
            // This is used to return null as the map function requires a return
            // statement
            return null;
        });

        // This is used to set the team members to the new team details
        setTeamMembers(newTeamDetails)

    }, [])

    const [selected, setSelected] = React.useState(-1)

    const handleSelection = (index: number) => {
        if (selected === index) {
            setSelected(-1)
        } else {
            setSelected(index)
        }
    }


    return (
        <section className='team-profiles-container'>
            <div className='team-profiles-header'>
                <h2>Meet the Team</h2>
            </div>
            <div className='team-profiles'>
                {
                    teamMembers.map((teamMember, index) => {
                        return (
                            <Profile
                                key={index}
                                index={index}
                                isSelected={selected === index}
                                handleSelection={handleSelection}
                                {...teamMember}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}
