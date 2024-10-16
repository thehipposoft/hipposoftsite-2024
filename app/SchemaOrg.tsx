'use client'
import React from "react";
import Script from "next/script"

const SchemaOrg = () => {
    return (
        <>
            <Script
                strategy="afterInteractive"
                type="application/ld+json"
                id="schema-org"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "HippoSoft",
                        "url": "https://thehipposoft.com/",
                        "logo": "https://thehipposoft.com/assets/logo.png",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+61 414 286 242",
                            "contactType": "customer service",
                            "areaServed": "AU",
                            "availableLanguage": "en"
                        },
                        "sameAs": [
                            "https://www.instagram.com/thehipposoft/",
                            "https://www.linkedin.com/company/hipposoft/"
                        ]
                    }`,
                }}
            />
        </>
    )
}

export default SchemaOrg