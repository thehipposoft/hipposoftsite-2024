import Image from "next/image"

const PORTFOLIO_DATA = [
    {
        slug: 'the-c-therapy',
        data: {
            mockGrid: '/assets/images/portfolio/tct-mock.webp',
            mockBig: '/assets/images/portfolio/c-therapy-mockg.webp',
            objectPosition: 'object-left',
            name: 'The C Therapy',
            nameColor: '#000000',
            href: 'https://thectherapy.com.au/',
            industry: 'Beauty - Wellness',
            work: 'Web Design + Code',
            year: '2024',
            flag: '/assets/images/portfolio/flag-aus.svg',
            technologies_icons: ['/assets/images/portfolio/wordpress.svg', '/assets/images/portfolio/react.svg'],
            logo_content: <div className="flex gap-2">
                <div className="rounded-full bg-[#87807D] flex justify-center items-center h-12 w-12 relative">
                    <Image src={'/assets/images/portfolio/tct.svg'} alt="The C-therapy logo" width={35} height={35} />
                </div>
            </div>,
        }
    },
    {
        slug: 'copa-tomada',
        data: {
            mockGrid: '/assets/images/portfolio/copa-mock.webp',
            mockBig: '/assets/images/portfolio/copa-mockg.webp',
            objectPosition: 'object-center',
            name: 'Copa Tomada',
            nameColor: '#000000',
            href: 'https://copatomada.com.ar/',
            industry: 'Retail',
            work: 'Web Design + Code',
            year: '2023',
            flag: '/assets/images/portfolio/flag-arg.svg',
            technologies_icons: ['/assets/images/portfolio/react.svg'],
            logo_content: <Image src={'/assets/images/portfolio/copatomada-logo.png'} alt="Copa tomada logo" width={55} height={55}/>,
        },
    },
    {
        slug: 'laboratorio-liap',
        data: {
            mockGrid: '/assets/images/portfolio/liap-mock.webp',
            mockBig: '/assets/images/portfolio/liap-mockg.webp',
            objectPosition: 'object-[37%]',
            name: 'Laboratorio LIAP',
            nameColor: '#000000',
            href: 'https://laboratorioliap.com.ar/',
            industry: 'Education - Policy',
            work: 'Web Design + Code',
            year: '2024',
            flag: '/assets/images/portfolio/flag-arg.svg',
            technologies_icons: ['/assets/images/portfolio/wordpress.svg'],
            logo_content: <Image src={'/assets/images/portfolio/liap-logo.png'} alt="Laboratorio LIAP logo" width={120} height={120}/>,
        }

    },
    {
        slug: 'mb-analyst',
        data: {
            mockGrid: '/assets/images/portfolio/mb-mock.webp',
            mockBig: '/assets/images/portfolio/mb-mockg.webp',
            objectPosition: 'object-[70%]',
            name: 'MBanalyst',
            nameColor: '#000000',
            href: 'https://www.mbanalyst.com/',
            industry: 'Data analyst - Power BI',
            work: 'Web Design + Code',
            year: '2023',
            flag: '/assets/images/portfolio/flag-aus.svg',
            technologies_icons: ['/assets/images/portfolio/react.svg'],
            logo_content: <Image src={'/assets/images/portfolio/mb-logo.png'} alt="MBAnalyst logo" width={100} height={100}/>,
        }
    },
    {
        slug: 'rock-steady',
        data: {
            mockGrid: '/assets/images/webdesign/rocksteady.webp',
            mockBig: '/assets/images/webdesign/rocksteady.webp',
            objectPosition: 'object-center',
            name: 'Rock Steady Digital',
            nameColor: '#000000',
            href: 'https://www.rocksteadydigital.com.au/',
            industry: 'Communication - Tech - Digital',
            work: 'Web Design + Code',
            year: '2023',
            flag: '/assets/images/portfolio/flag-aus.svg',
            technologies_icons: ['/assets/images/portfolio/react.svg'],
            logo_content: <Image src={'/assets/images/logofolio/rock-steady.png'} alt="Rock Steady logo" width={120} height={120}/>,
        }
    },
    {
        slug: 'masonry-men',
        data: {
            mockGrid: '/assets/images/webdesign/masonry.webp',
            mockBig: '/assets/images/portfolio/mason-mockg.webp',
            objectPosition: 'object-[30%]',
            name: 'Masonry Men',
            nameColor: '#000000',
            href: 'https://masonrymen.com.au/',
            industry: 'Construction',
            work: 'Web Design + Code',
            year: '2024',
            flag: '/assets/images/portfolio/flag-aus.svg',
            technologies_icons: ['/assets/images/portfolio/wordpress.svg'],
            logo_content: <Image src={'/assets/images/portfolio/masonry-logo.png'} alt="Masonry Men logo" width={140} height={140}/>,
        }
    },
    {
        slug: 'james-conrad-architect',
        data: {
            mockGrid: '/assets/images/webdesign/conrad.webp',
            mockBig: '/assets/images/webdesign/conrad.webp',
            objectPosition: 'object-center',
            name: 'James Conrad Architect',
            nameColor: '#000000',
            href: 'https://www.conradarchitect.com/',
            industry: 'Architecture',
            work: 'Web Design + Code',
            year: '2023',
            flag: '/assets/images/portfolio/flag-usa.svg',
            technologies_icons: ['/assets/images/portfolio/react.svg'],
            logo_content: <Image src={'/assets/images/portfolio/jc-logo.png'} alt="James Conrad logo" width={140} height={140}/>,
        }
    },
    {
        slug: 'destino-salta',
        data: {
            mockGrid: '/assets/images/portfolio/destino-mock.webp',
            mockBig: '/assets/images/portfolio/destino-mockg.png',
            objectPosition: 'object-left',
            name: 'Destino Salta',
            nameColor: '#000000',
            href: 'https://destinosalta.com.ar/',
            industry: 'Rental - accommodation',
            work: 'Web Design + Code',
            year: '2023',
            flag: '/assets/images/portfolio/flag-arg.svg',
            technologies_icons: ['/assets/images/portfolio/wordpress.svg'],
            logo_content: <Image src={'/assets/images/logofolio/destino.png'} alt="Destino Salta logo" width={100} height={100}/>,
        },
    },
    {
        slug: 'steel-art',
        data: {
            mockGrid: '/assets/images/webdesign/steelart.webp',
            mockBig: '/assets/images/webdesign/steelart.webp',
            name: 'Steel Art',
            nameColor: '#000000',
            href: 'https://steelartsla.com.ar/',
            industry: 'Construction',
            work: 'Web Design + Code',
            year: '2024',
            flag: '/assets/images/portfolio/flag-arg.svg',
            technologies_icons: ['/assets/images/portfolio/react.svg'],
            logo_content: <Image src={'/assets/images/portfolio/steel-logo.png'} alt="Masonry Men logo" width={120} height={120}/>,
        }
    },
]

export {
    PORTFOLIO_DATA
}