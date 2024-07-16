import React from 'react';
import LogofolioSingleComp from './Logofolio/LogofolioSingleComp';

const SocialMediaData = {
    category: 'Social Media',
    name: 'Steel Art',
    description: ['At Hipposoft we are also dedicated to the development of Social Networks to enhance brands.',
        'Tailor-made strategies: We design unique strategies adapted to your business.',
        'Quality Content: We create visual and written content that captures the essence of your brand.',
        'Analysis and reporting: We monitor performance and adjust tactics to achieve the best results.'
    ],
    client: 'Steel_art_sla is a company from Salta, Argentina that specializes in laser cutting of metal sheets, and is one of the clients who contacted us to manage their social networks. We invite you to check out their Instagram profile here! ',
    href: 'https://www.instagram.com/steel_art_sla/',
    information: ['STEEL ART', 'SALTA - ARGENTINA', 'AUGUST 2023'],
    gallery: ['/assets/images/socialmedia/steel-art/steel-1.webp', '/assets/images/socialmedia/steel-art/steel-2.webp', '/assets/images/socialmedia/steel-art/steel-3.webp', '/assets/images/socialmedia/steel-art/steel-4.webp', ],
}

const SocialMediaComp = () => {
    return (
        <div>
            <LogofolioSingleComp data={SocialMediaData} />
        </div>
    );
};

export default SocialMediaComp;