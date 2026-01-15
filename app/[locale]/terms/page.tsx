import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HippoSoft | Terms of Service',
  description: 'Terms of Service for HippoSoft - Review the terms and conditions for using our services.',
}

export default function TermsOfService() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl text-black">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-sm text-gray-600 mb-8">Last updated: January 15, 2026</p>

            <section className="mb-8 text-black">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                    By accessing and using HippoSoft's website and services, you accept and agree to be bound by the
                    terms and provision of this agreement. If you do not agree to these terms, please do not use our
                    services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p className="mb-4">
                    Permission is granted to temporarily access the materials (information or software) on HippoSoft's
                    website for personal, non-commercial transitory viewing only. This is the grant of a license, not
                    a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on HippoSoft's website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Services</h2>
                <p className="mb-4">
                    HippoSoft provides web design, web development, branding, and related digital services. The
                    specific terms of service delivery will be outlined in individual project agreements or contracts.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
                <p className="mb-4">
                    The materials on HippoSoft's website are provided on an 'as is' basis. HippoSoft makes no
                    warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                    without limitation, implied warranties or conditions of merchantability, fitness for a particular
                    purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="mb-4">
                    Further, HippoSoft does not warrant or make any representations concerning the accuracy, likely
                    results, or reliability of the use of the materials on its website or otherwise relating to such
                    materials or on any sites linked to this site.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
                <p className="mb-4">
                    In no event shall HippoSoft or its suppliers be liable for any damages (including, without
                    limitation, damages for loss of data or profit, or due to business interruption) arising out of
                    the use or inability to use the materials on HippoSoft's website, even if HippoSoft or a HippoSoft
                    authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Accuracy of Materials</h2>
                <p className="mb-4">
                    The materials appearing on HippoSoft's website could include technical, typographical, or
                    photographic errors. HippoSoft does not warrant that any of the materials on its website are
                    accurate, complete or current. HippoSoft may make changes to the materials contained on its
                    website at any time without notice.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Links</h2>
                <p className="mb-4">
                    HippoSoft has not reviewed all of the sites linked to its website and is not responsible for the
                    contents of any such linked site. The inclusion of any link does not imply endorsement by HippoSoft
                    of the site. Use of any such linked website is at the user's own risk.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
                <p className="mb-4">
                    HippoSoft may revise these terms of service for its website at any time without notice. By using
                    this website you are agreeing to be bound by the then current version of these terms of service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
                <p className="mb-4">
                    These terms and conditions are governed by and construed in accordance with the laws of the
                    jurisdiction in which HippoSoft operates and you irrevocably submit to the exclusive jurisdiction
                    of the courts in that location.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                <p className="mb-4">
                    If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="mb-2">Email: info@hipposoft.com</p>
            </section>
        </div>
    );
}
