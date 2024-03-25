import React from 'react'
import './team_list.css'

import teamDetails from '../../../content/team_details.json'
import aboutJson from '../../../content/about_page.json'

import TeamSection from './team_section/team_section';

import iconFinance from '../../../images/team_icons/icon_finance.png'
import iconHardware from '../../../images/team_icons/icon_hardware.png'
import iconManagement from '../../../images/team_icons/icon_management.png'
import iconOutreach from '../../../images/team_icons/icon_outreach.png'
import iconSensors from '../../../images/team_icons/icon_sensors.png'
import iconSocial from '../../../images/team_icons/icon_social.png'
import iconSoftware from '../../../images/team_icons/icon_software.png'

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
    isLegacy: boolean;
    Lead: string;
};

type T_orgDetails = {
    [key: string]: {
        icon: any,
        description: string,
        members: T_teamMember[],
        legacyMembers: T_teamMember[]
    };
};

/**
 * Renders the team profiles section.
 * Fetches team member details and their images.
 * 
 * @returns The rendered team profiles section.
 */
export default function TeamList() {
    const [orgDetails, setOrgDetails] = React.useState<T_orgDetails>({});

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

        const orgTeamDetails: T_orgDetails = {
            "Management": {
                "icon": iconManagement,
                "description": aboutJson.teamDescriptions.Management,
                "members": [],
                "legacyMembers": []
            },
            "Hardware": {
                "icon": iconHardware,
                "description": aboutJson.teamDescriptions.Hardware,
                "members": [],
                "legacyMembers": []
            },
            "Sensors": {
                "icon": iconSensors,
                "description": aboutJson.teamDescriptions.Sensors,
                "members": [],
                "legacyMembers": []
            },
            "Software": {
                "icon": iconSoftware,
                "description": aboutJson.teamDescriptions.Software,
                "members": [],
                "legacyMembers": []
            },
            "Finance": {
                "icon": iconFinance,
                "description": aboutJson.teamDescriptions.Finance,
                "members": [],
                "legacyMembers": []
            },
            "Outreach": {
                "icon": iconOutreach,
                "description": aboutJson.teamDescriptions.Outreach,
                "members": [],
                "legacyMembers": []
            },
            "Social": {
                "icon": iconSocial,
                "description": aboutJson.teamDescriptions.Social,
                "members": [],
                "legacyMembers": []
            }
        }


        Object.keys(orgTeamDetails).forEach((teamName: string) => {

            // This is used to filter the team members based on the team name
            const teamMembers = newTeamDetails.filter((member) => {
                return member.Roles.find((role) => role.Team === teamName);
            });

            const legacyMembers = teamMembers.filter((member) => member.isLegacy);
            const nonLegacyMembers = teamMembers.filter((member) => !member.isLegacy);

            const sortedNonLegacyMembers = nonLegacyMembers.sort((a, b) => {
                if (a.Lead === teamName && b.Lead !== teamName) {
                    return -1;
                } else if (a.Lead !== teamName && b.Lead === teamName) {
                    return 1;
                } else {
                    return a.Name.localeCompare(b.Name);
                }
            });

            const sortedLegacyMembers = legacyMembers.sort((a, b) => {
                return a.Name.localeCompare(b.Name);
            });

            orgTeamDetails[teamName].members = sortedNonLegacyMembers;
            orgTeamDetails[teamName].legacyMembers = sortedLegacyMembers;
        });
        
        console.log(orgTeamDetails)

        // This is used to set the team members to the new team details
        setOrgDetails(orgTeamDetails);

    }, [])

    const [selectedProfileIndex, setSelectedProfileIndex] = React.useState(-1)

    const handleProfileSelection = (index: number) => {
        if (selectedProfileIndex === index) {
            setSelectedProfileIndex(-1)
        } else {
            setSelectedProfileIndex(index)
        }
    }

    const [showLegacy, setShowLegacy] = React.useState(false);

    const handleLegacyToggle = () => {
        setShowLegacy(!showLegacy);
    }

    return (
        <section className='team-list-container'>
            <header className='team-list-header'>
                <h2>Meet the Team</h2>
                <div className='legacy-toggle'>
                    <p>
                        Show Legacy Members: 
                    </p>
                    <div className='toggle'>
                        <input
                            type="checkbox"
                            id="legacy-toggle"
                            checked={showLegacy}
                            onChange={handleLegacyToggle}
                        />
                        <label htmlFor="legacy-toggle"></label>
                    </div>
                </div>
            </header>

            <div className='team-list'>
                {
                    orgDetails && Object.keys(orgDetails).map((
                        teamName: string,
                        index: number
                    ) => {
                        return (
                            <TeamSection
                                key={index}
                                index={index}
                                teamName={teamName}
                                showLegacy={showLegacy}
                                selectedIndex={selectedProfileIndex}
                                handleSelection={handleProfileSelection}
                                {...orgDetails[teamName]}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}
