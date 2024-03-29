import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export default function LinkIcons({ link, darkMode }: { link: string, darkMode: boolean}) {
    const [icon, setIcon] = React.useState<any>(faLink)

    useEffect(() => {
        if (link.includes('linkedin')) {
            setIcon(faLinkedin)
        } else if (link.includes('instagram')) {
            setIcon(faInstagram)
        } else if (link.includes('github')) {
            setIcon(faGithub)
        } else {
            setIcon(faLink)
        }
    }, [link])

    return (
        <a href={link} target='_blank' rel='noreferrer'>
            <FontAwesomeIcon icon={icon} /> 
        </a>
    )
}
