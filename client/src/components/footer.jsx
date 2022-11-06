import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
    return (
        <footer className="flex-shrink-0 py-4 bg-dark text-white-50" style={{visibility: 'hidden'}}>
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
        </footer>
        // <footer className="flex-shrink-0 py-4 bg-dark text-white-50">
        //     <div className="container text-center">
        //         <small>Copyright &copy; Your Website</small>
        //     </div>
        // </footer>
    )
}