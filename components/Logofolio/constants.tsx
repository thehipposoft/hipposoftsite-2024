import Image from "next/image"

const LOGOFOLIO_DATA = [
    {
        name: 'Rock Steady Digital',
        description: ['Rock Steady assists organizations in their digital transformation and implements their requirements.',
            'Its mission is to enhance companies existing digital capabilities through website and social media development, e-commerce implementations and digital transformations.', 'Rock Steady brings people, processes, tools and data together in a creative way that helps companies achieve success through continuous improvement.'],
        concept: [`The logo is bold and playful, a symbol of the company's attitude. It represents its rebellious and innovative character. The accompanying elements (stars) symbolize the digital transformation journey, which aims to connect the past with the future of the companies.`],
        content: <div className="flex flex-col md:flex-row gap-12 pt-12">
                    <div className="flex flex-col gap-6">
                        <p className="text-sm">Primary Palett</p>
                        <div className="flex gap-12">
                            <div className="flex flex-col gap-4">
                                <div className="rounded-full bg-[#040D26] w-[140px] h-[140px]" />
                                <div className="flex flex-col text-xs">
                                    <p>RGB: 4/13/38</p>
                                    <p>HEX: 040D26</p>
                                    <p>CMYK: 80/73/60/84</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="rounded-full bg-[#A60321] w-[140px] h-[140px]" />
                                <div className="flex flex-col text-xs">
                                    <p>RGB: 166/3/33</p>
                                    <p>HEX: A60321</p>
                                    <p>CMYK: 20/100/100/22</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="text-sm">Tonal gradient</p>
                        <div className="flex items-end gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="rounded-full bg-[#380A24] w-[70px] h-[70px]" />
                                <div className="flex flex-col text-xs">
                                    <p>RGB: 56/10/36</p>
                                    <p>HEX: 380A24</p>
                                    <p>CMYK: 65/76/58/81</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="rounded-full bg-[#860522] w-[70px] h-[70px]" />
                                <div className="flex flex-col text-xs">
                                    <p>RGB: 134/5/34</p>
                                    <p>HEX: 860522</p>
                                    <p>CMYK: 27/100/100/41</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
        href: 'https://www.rocksteadydigital.com.au/',
        information: ['Rock steady digital', 'AUSTRALIA', 'November 2022'],
        logo: '/assets/images/logofolio/rock-steady.png',
        logoSizes: ['220px', '120px'],
        gallery: ['/assets/images/logofolio/rs/rock-1.webp', '/assets/images/logofolio/rs/rock-2.webp', '/assets/images/logofolio/rs/rock-3.webp', '/assets/images/logofolio/rs/rock-4.webp'],
        vectorColors: ['#000000', '#000000', '#000000', '#70FFE5',],
    },
    {
        name: 'Inspir Performance',
        description: ['Inspir is an elite performance expert that helps elite athletes and executives in competitive fields tounleash the power of the mind and create the mental toughness needed to perform at their best.',
            'It provides an innovative and efficient solution for associations, and responds to all requests: help, advice and support to athletes, teams or organizations.'],
        concept: [`“The mind is not a vessel to be filled, but a fire to be ignited.”, Plutarch, ancient Greece.`],
        content: <div className="flex flex-col gap-12 pt-4">
                    <div className="relative w-[300px] h-[165px]">
                        <Image src={'/assets/images/logofolio/inspir/inspir-info.webp'} fill alt="Inspir primary colors" />
                    </div>
                    <div className="relative w-[310px] h-[160px]">
                        <Image src={'/assets/images/logofolio/inspir/inspir-info2.webp'} fill alt="Inspir tonal gradient" />
                    </div>
                </div>,
        information: ['INSPIR PERFORMANCE', 'PARIS - AUSTRALIA', 'March 2023'],
        logo: '/assets/images/logofolio/inspir.png',
        logoSizes: ['200px', '100px'],
        href: 'https://www.inspirperformance.com/',
        gallery: ['/assets/images/logofolio/inspir/inspir-1.webp', '/assets/images/logofolio/inspir/inspir-2.webp', '/assets/images/logofolio/inspir/inspir-3.webp', '/assets/images/logofolio/inspir/inspir-4.webp'],
        vectorColors: ['#70FFE5', '#000000', '#000000', '#70FFE5',],
    },
    {
        name: 'Diversity Employment',
        description: ['Diversity Employment  helps companies in the Nelson/Tasman region recruit to retain employees in hard-to-fill short-skill occupations.', 'Recruitment for retention combines  the process of carefully selecting an individual to obtain a lasting and satisfying relationship with the employee.'],
        concept: ['Rope, conexion, abstract monogram “D E”. The construction of the brand was generated from the circle, one of the most flexible and meaningful geometric shapes.', 'In this case, both semicircles joined by an inner circle seek to reflect the aim of the company, which is to intermediate between the employer and the immigrant. Its circular shape makes it emotionally more positive and close, other values that conveys are: movement, globality, protection, reliability.'],
        content: <div className="flex flex-col md:flex-row justify-between pt-6 gap-8 md:gap-0">
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">Primary Colors</p>
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-4">
                                <div className="md:w-[7vw] w-[15vw] h-[5vh] bg-[#44B2AF]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #44B2AF</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                          </div>
                            <div className="flex flex-col gap-4">
                                <div className="md:w-[7vw] w-[15vw] h-[5vh] bg-[#30528D]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #44B2AF</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="md:w-[7vw] w-[15vw] h-[5vh] bg-[#F15F3F]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #44B2AF</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">Accent</p>
                        <div className="grid">
                            <div className="flex flex-col gap-4">
                                <div className="md:w-[7vw] w-[15vw] h-[5vh] bg-[#FFCC5F]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #FFCC5F</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>,
        href: 'https://diversityemployment.nz/',
        information: ['Diversity employment', 'New Zealand', 'October 2023'],
        logo: '/assets/images/logofolio/diversity.png',
        logoSizes: ['300px', '80px'],
        gallery: ['/assets/images/logofolio/diversity/diversity-1.webp', '/assets/images/logofolio/diversity/diversity-3.webp', '/assets/images/logofolio/diversity/diversity-4.webp', '/assets/images/logofolio/diversity/diversity-2.webp'],
        vectorColors: ['#000000', '#000000', '#70FFE5', '#70FFE5',],
    },
    {
        name: 'Destino Salta',
        description: ['Destino Salta is a temporary rental project that seeks to offer a unique lodging experience in the city of Salta, the Northwest of Argentina, in a simple and reliable way.'],
        concept: ['Destino Salta is a brand that honors the cultural and scenic richness of the province of Salta. The logo seeks to capture its essence, its earthy colors evoke the regional chromatic palette, highlighting the burgundy tone of the Salta poncho as the primary color.', `Recognized elements of the local flora and fauna were chosen for the design to convey the concept of the province's vast biodiversity. Salta's landscape is one of its most famous attributes and that is why thousands of tourists visit it every year.`],
        content: <div className="flex md:flex-row-reverse flex-col-reverse gap-8 md:gap-0 justify-between pt-6">
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">Secundary Colors</p>
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-4">
                                <div className="md:w-[7vw] w-[15vw] h-[5vh] bg-[#BE6312]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 190</p>
                                    <p className="light">G: 99</p>
                                    <p className="light">B: 18</p>
                                    <p className="light">Hex: #BE6312</p>
                                    <p className="light">C: 20</p>
                                    <p className="light">M: 71</p>
                                    <p className="light">Y: 100</p>
                                    <p className="light">K: 9</p>
                                </div>
                        </div>
                            <div className="flex flex-col gap-4">
                                <div className="md:w-[7vw] w-[15vw] h-[5vh] bg-[#EF973B]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 239</p>
                                    <p className="light">G: 151</p>
                                    <p className="light">B: 59</p>
                                    <p className="light">Hex: #EF973B</p>
                                    <p className="light">C: 3</p>
                                    <p className="light">M: 49</p>
                                    <p className="light">Y: 97</p>
                                    <p className="light">K: 0</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="md:w-[7vw] w-[15vw] h-[5vh] bg-[#4B4136]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 75</p>
                                    <p className="light">G: 65</p>
                                    <p className="light">B: 54</p>
                                    <p className="light">Hex: #4B4136</p>
                                    <p className="light">C: 56</p>
                                    <p className="light">M: 63</p>
                                    <p className="light">Y: 79</p>
                                    <p className="light">K: 62</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">Primary Colors</p>
                        <div className="grid">
                            <div className="flex flex-col gap-4">
                                <div className="md:w-[7vw] w-[15vw] h-[5vh] bg-[#8F122B]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #8F122B</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>,
        href: 'https://destinosalta.com.ar/',
        information: ['Destino salta', 'Argentina', 'October 2023'],
        logo: '/assets/images/logofolio/destino.png',
        logoSizes: ['200px', '200px'],
        gallery: ['/assets/images/logofolio/destino/destino-1.webp', '/assets/images/logofolio/destino/destino-2.webp', '/assets/images/logofolio/destino/destino-3.webp', '/assets/images/logofolio/destino/destino-4.webp'],
        vectorColors: ['#70FFE5', '#70FFE5', '#000000', '#000000',],
    },
]

export {
    LOGOFOLIO_DATA
}
