import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Terms of <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Service</span>
                    </h1>
                    <p className="text-gray-400 text-lg">Last updated: November 27, 2024</p>
                </div>

                {/* Content */}
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
                    <div className="prose prose-invert max-w-none">
                        {/* Introduction */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                            <p className="text-gray-300 leading-relaxed">
                                By accessing and using ShowQ ("the Platform"), you accept and agree to be bound by the terms
                                and provision of this agreement. If you do not agree to these Terms of Service, please do not
                                use our platform. We reserve the right to modify these terms at any time, and such modifications
                                shall be effective immediately upon posting.
                            </p>
                        </section>

                        {/* User Accounts */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                To access certain features of the Platform, you must register for an account:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li>You must be at least 18 years old to create an account</li>
                                <li>You must provide accurate and complete information during registration</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You are responsible for all activities that occur under your account</li>
                                <li>You must notify us immediately of any unauthorized access to your account</li>
                                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                            </ul>
                        </section>

                        {/* Services */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Platform Services</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                ShowQ provides the following services:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li><strong className="text-white">Movie Browsing:</strong> Access to our catalog of movies and trailers</li>
                                <li><strong className="text-white">Ticket Booking:</strong> Purchase tickets for movie screenings</li>
                                <li><strong className="text-white">Digital Purchases:</strong> Buy or rent digital copies of movies</li>
                                <li><strong className="text-white">Wishlist:</strong> Save movies for later viewing</li>
                                <li><strong className="text-white">Recommendations:</strong> Personalized movie suggestions</li>
                            </ul>
                            <p className="text-gray-300 leading-relaxed mt-4">
                                We reserve the right to modify, suspend, or discontinue any part of our services at any time
                                without prior notice.
                            </p>
                        </section>

                        {/* Payment and Pricing */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Payment and Pricing</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li>All prices are displayed in the local currency and include applicable taxes unless stated otherwise</li>
                                <li>Payment must be made in full at the time of booking or purchase</li>
                                <li>We accept major credit cards, debit cards, and other payment methods as displayed</li>
                                <li>Prices are subject to change without notice, but changes will not affect confirmed bookings</li>
                                <li>Promotional codes and discounts cannot be combined unless explicitly stated</li>
                                <li>In case of pricing errors, we reserve the right to cancel the transaction and issue a full refund</li>
                            </ul>
                        </section>

                        {/* Refunds and Cancellations */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Refunds and Cancellations</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                <strong className="text-white">Ticket Bookings:</strong>
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                                <li>Cancellations must be made at least 2 hours before showtime for a full refund</li>
                                <li>Cancellations made less than 2 hours before showtime are non-refundable</li>
                                <li>Refunds will be processed within 5-7 business days to the original payment method</li>
                            </ul>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                <strong className="text-white">Digital Purchases:</strong>
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li>Digital purchases are generally non-refundable once streaming has begun</li>
                                <li>Technical issues preventing access may qualify for a refund at our discretion</li>
                            </ul>
                        </section>

                        {/* User Conduct */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">6. User Conduct</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                You agree not to:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li>Use the platform for any illegal or unauthorized purpose</li>
                                <li>Violate any laws in your jurisdiction</li>
                                <li>Share, sell, or transfer your account to another person</li>
                                <li>Attempt to gain unauthorized access to any portion of the platform</li>
                                <li>Use automated systems to access the platform without permission</li>
                                <li>Circumvent any security features or restrictions</li>
                                <li>Post or transmit any harmful, threatening, or offensive content</li>
                                <li>Infringe upon intellectual property rights of ShowQ or third parties</li>
                            </ul>
                        </section>

                        {/* Intellectual Property */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property Rights</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                All content on ShowQ, including but not limited to text, graphics, logos, images, videos,
                                audio clips, and software, is the property of ShowQ or its content suppliers and is protected
                                by international copyright laws.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                You may not reproduce, distribute, modify, create derivative works of, publicly display,
                                publicly perform, republish, download, store, or transmit any material from our platform
                                without prior written consent.
                            </p>
                        </section>

                        {/* Content Streaming */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">8. Content Streaming and Viewing</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li>Streaming quality depends on your internet connection speed</li>
                                <li>Content is licensed for personal, non-commercial use only</li>
                                <li>Screen recording or capturing streamed content is strictly prohibited</li>
                                <li>Rental periods typically expire after 48 hours from start of viewing</li>
                                <li>Purchased content remains available in your library subject to licensing agreements</li>
                                <li>Some content may be geo-restricted based on licensing agreements</li>
                            </ul>
                        </section>

                        {/* Age Restrictions */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">9. Age Restrictions and Parental Controls</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Movies are rated according to standard classification systems. You are responsible for ensuring
                                that content accessed through your account is appropriate for all viewers. Parents and guardians
                                are responsible for monitoring minors' use of the platform. We provide parental control features
                                to help restrict access to age-inappropriate content.
                            </p>
                        </section>

                        {/* Limitation of Liability */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                ShowQ and its affiliates shall not be liable for:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li>Any indirect, incidental, special, or consequential damages</li>
                                <li>Loss of profits, data, or business opportunities</li>
                                <li>Service interruptions or technical difficulties</li>
                                <li>Unauthorized access to or alteration of your transmissions or data</li>
                                <li>Third-party content or actions on the platform</li>
                            </ul>
                            <p className="text-gray-300 leading-relaxed mt-4">
                                Our maximum liability is limited to the amount you paid for the services in the past 12 months.
                            </p>
                        </section>

                        {/* Disclaimer */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">11. Disclaimer of Warranties</h2>
                            <p className="text-gray-300 leading-relaxed">
                                The platform is provided "as is" and "as available" without warranties of any kind, either
                                express or implied. We do not guarantee that the platform will be uninterrupted, secure, or
                                error-free. We do not warrant that results obtained from the use of the platform will be
                                accurate or reliable.
                            </p>
                        </section>

                        {/* Governing Law */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law and Dispute Resolution</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
                                in which ShowQ operates, without regard to conflict of law provisions.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Any disputes arising from these Terms shall first be attempted to be resolved through good
                                faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration
                                or in courts of competent jurisdiction.
                            </p>
                        </section>

                        {/* Termination */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">13. Termination</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may terminate or suspend your account and access to the platform immediately, without prior
                                notice or liability, for any reason, including breach of these Terms. Upon termination, your
                                right to use the platform will immediately cease. You may also terminate your account at any
                                time through your account settings.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <p className="text-gray-300">Email: <a href="mailto:support@showq.com" className="text-red-400 hover:text-red-300">support@showq.com</a></p>
                                <p className="text-gray-300 mt-2">Customer Service: +91 1234567890</p>
                                <p className="text-gray-300 mt-2">Address: ShowQ Legal Team, 123 Cinema Street Ahmedabad, Gujarat, India</p>
                            </div>
                        </section>

                        {/* Acknowledgment */}
                        <section className="mb-8">
                            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <p className="text-gray-300 leading-relaxed">
                                    <strong className="text-white">BY USING SHOWQ, YOU ACKNOWLEDGE THAT YOU HAVE READ,
                                        UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.</strong>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Terms;
