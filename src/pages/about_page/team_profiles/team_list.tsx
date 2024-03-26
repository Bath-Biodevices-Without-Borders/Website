import React from 'react'
import './team_list.css'

import { T_teamMembers, T_orgDetails } from '../../../types/types'
import { createOrgDetails, loadImages, sortOrgDetails } from './team_list_utils'

import teamDetailsJson from '../../../content/team_details.json'

import TeamSection from './team_section';
import { AnimatePresence, LayoutGroup } from 'framer-motion'

import Modal from './modal'

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
        sortOrgDetails(orgTeamDetails, newOrgDetails)
        setOrgDetails(orgTeamDetails);
    }, [])

    const [selectedProfileIndex, setSelectedProfileIndex] = React.useState(-1)
    const [selectedProfile, setSelectedProfile] = React.useState({} as T_teamMembers['members'][0])

    const handleProfileSelection = (index: number) => {
        if (selectedProfileIndex === index) {
            setSelectedProfileIndex(-1)
        } else {
            Object.keys(orgDetails).forEach((teamName: string) => {
                const team = orgDetails[teamName]
                const member = team.members.find((member) => member.id === index)
                if (member) {
                    setSelectedProfile(member);
                }
            })
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
            <LayoutGroup>
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
                <AnimatePresence>
                    {
                        selectedProfileIndex !== -1 && (
                            <Modal
                                handleSelection={() => handleProfileSelection(-1)}
                                {...selectedProfile}
                            />
                        )
                    }
                </AnimatePresence>
            </LayoutGroup>
        </section>
    )
}

