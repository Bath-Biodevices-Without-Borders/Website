import { T_teamMembers, T_orgDetails, T_orgIcons, T_role } from '../../../types/types';

import aboutJson from '../../../content/about_page.json'

import iconFinance from '../../../images/team_icons/icon_finance.png'
import iconHardware from '../../../images/team_icons/icon_hardware.png'
import iconManagement from '../../../images/team_icons/icon_management.png'
import iconOutreach from '../../../images/team_icons/icon_outreach.png'
import iconSensors from '../../../images/team_icons/icon_sensors.png'
import iconSocial from '../../../images/team_icons/icon_social.png'
import iconSoftware from '../../../images/team_icons/icon_software.png'

/**
 * Creates organization details based on the provided team members.
 * @param newOrgDetails - The team members for each organization.
 * @returns The organization details object.
 */
export function createOrgDetails(newOrgDetails: T_teamMembers) {
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

/**
 * Loads images for team members based on their email.
 * @param newOrgDetails - The object containing team member details.
 */
export function loadImages(newOrgDetails: T_teamMembers) {
  let r = require.context(
      '../../../images/team_profiles/',
      false,
      /\.(png|jpe?g|svg)$/
  );

  /**
   * This method is used to map over all the images that have been imported
   * and match them to the correct team member based on the email as the
   * image name is the same as the email; excluding the email handler.
   * @param item - The image file path.
   * @param _ - The index of the item (unused).
   * @returns null.
   */
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

/**
 * Sorts the organization team details based on the provided team members.
 * 
 * @param orgTeamDetails - The current organization team details.
 * @param newOrgDetails - The new team members to be sorted.
 */
export function sortOrgDetails(orgTeamDetails: T_orgDetails, newOrgDetails: T_teamMembers) {
    Object.keys(orgTeamDetails).forEach((teamName: string) => {
        const teamMembers = newOrgDetails[teamName]
        const legacyMembers = teamMembers.filter((member) => member.isLegacy)
        const nonLegacyMembers = teamMembers.filter((member) => !member.isLegacy)
        const sortedNonLegacyMembers = nonLegacyMembers.sort((a, b) => {
            const aRole: T_role | undefined = a.roles.find((role) => role.team === teamName)
            const bRole: T_role | undefined = b.roles.find((role) => role.team === teamName)

            if (aRole?.lead && !bRole?.lead) {
                return -1
            } else if (!aRole?.lead && bRole?.lead) {
                return 1
            } else {
                return a.name.localeCompare(b.name)
            }
        })

        const sortedLegacyMembers = legacyMembers.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })

        orgTeamDetails[teamName].members = sortedNonLegacyMembers
        orgTeamDetails[teamName].legacyMembers = sortedLegacyMembers
    })
}