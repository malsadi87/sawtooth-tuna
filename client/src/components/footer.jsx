import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
    return (
        <div className="footer d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary" style={{visibility: 'hidden'}}>
            <div className="text-white mb-3 mb-md-0">
                TODO: This element is hidden untill we fix the footer being badly alligned.
                Copyright © 2022. All rights reserved.
            </div>

            <div>
                <a href="#!" className="text-white me-4">
                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                </a>
                <a href="#!" className="text-white me-4">
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                </a>
                <a href="#!" className="text-white me-4">
                    <FontAwesomeIcon icon={['fab', 'google']} />
                </a>
                <a href="#!" className="text-white">
                    <FontAwesomeIcon icon={['fab', 'linkedin']} />
                </a>
            </div>
        </div>
    )
}