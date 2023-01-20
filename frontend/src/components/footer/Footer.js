import './Footer.css'

const Footer = () => {
    return (
        <div className="footerLayout">
            <p>
                Copyright © Academia Nauk Stosowanych w Tarnowie 2022
            </p>
            <div className='socialMedia'>
                <button>
                    {/* Instagram */}
                </button>
                <button>
                    {/* Facebook */}
                </button>
                <button>
                    {/* twitter */}
                </button>
                <a href="https://github.com/kuborek2/MessengerApp" target="_blank">
                    {/* github */}
                </a>
            </div>
        </div>
    );
}

export default Footer;