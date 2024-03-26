import React from 'react'
import './team_list.css'

import { T_teamMembers, T_orgDetails, T_role, T_orgIcons } from '../../../types/types'

import teamDetailsJson from '../../../content/team_details.json'
import aboutJson from '../../../content/about_page.json'

import TeamSection from './team_section/team_section';

import iconFinance from '../../../images/team_icons/icon_finance.png'
import iconHardware from '../../../images/team_icons/icon_hardware.png'
import iconManagement from '../../../images/team_icons/icon_management.png'
import iconOutreach from '../../../images/team_icons/icon_outreach.png'
import iconSensors from '../../../images/team_icons/icon_sensors.png'
import iconSocial from '../../../images/team_icons/icon_social.png'
import iconSoftware from '../../../images/team_icons/icon_software.png'



/**
 * Renders the team profiles section.
 * Fetches team member details and their images.
 * 
 * @returns The rendered team profiles section.
 */
export default function TeamList() {
    const [orgDetails, setOrgDetails] = React.useState<T_orgDetails>({});

    React.useEffect(() => {
        const newOrgDetails: T_teamMembers = teamDetailsJson as T_teamMembers;
        loadImages(newOrgDetails);
        const orgTeamDetails: T_orgDetails = createOrgDetails(newOrgDetails);


        Object.keys(orgTeamDetails).forEach((teamName: string) => {
            const teamMembers = newOrgDetails[teamName];
            const legacyMembers = teamMembers.filter((member) => member.isLegacy);
            const nonLegacyMembers = teamMembers.filter((member) => !member.isLegacy);
            const sortedNonLegacyMembers = nonLegacyMembers.sort((a, b) => {
                const aRole: T_role | undefined = a.roles.find((role) => role.team === teamName);
                const bRole: T_role | undefined = b.roles.find((role) => role.team === teamName);

                if (aRole?.lead && !bRole?.lead) {
                    return -1;
                } else if (!aRole?.lead && bRole?.lead) {
                    return 1;
                } else {
                    return a.name.localeCompare(b.name);
                }
            });

            const sortedLegacyMembers = legacyMembers.sort((a, b) => {
                return a.name.localeCompare(b.name);
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
function createOrgDetails(newOrgDetails: T_teamMembers) {
    const orgIcons: T_orgIcons = {
        "Management": iconManagement,
        "Hardware": iconHardware,
        "Sensors": iconSensors,
        "Software": iconSoftware,
        "Finance": iconFinance,
        "Outreach": iconOutreach,
        "Social": iconSocial
    };

    const orgTeamDetails: T_orgDetails = {};
    Object.keys(newOrgDetails).forEach((teamName: string) => {
        orgTeamDetails[teamName] = {
            "icon": orgIcons[teamName],
            "description": aboutJson.teamDescriptions[teamName as keyof typeof aboutJson.teamDescriptions],
            "members": [],
            "legacyMembers": []
        };
    });
    return orgTeamDetails;
}

function loadImages(newOrgDetails: T_teamMembers) {
    let r = require.context(
        '../../../images/team_profiles/',
        false,
        /\.(png|jpe?g|svg)$/
    );

    // This method is used to map over all the images that have been imported
    // and match them to the correct team member based on the email as the
    // image name is the same as the email; excluding the email handler.
    r.keys().map((item: string, _) => {
        // This is used to get the username from the image name
        const username = item.replace('./', '').replace(/\.[^/.]+$/, '');
        // This is used to get the email from the username
        const email = `${username}@bath.ac.uk`;
        // This is used to find the index of the team member that has the same
        // email as the image name
        Object.keys(newOrgDetails).forEach((teamName) => {
            const index = newOrgDetails[teamName].findIndex((member) => {
                return member.email === email;
            });
            // This is used to set the image of the team member to the image that
            // has been imported
            if (index !== -1) {
                newOrgDetails[teamName][index].image = r(item);
            }
        });
        // This is used to return null as the map function requires a return
        // statement
        return null;
    });
}

