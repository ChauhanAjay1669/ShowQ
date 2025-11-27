import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Privacy <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Policy</span>
                    </h1>
                    <p className="text-gray-400 text-lg">Last updated: November 27, 2024</p>
                </div>

                {/* Content */}
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
                    <div className="prose prose-invert max-w-none">
                        {/* Introduction */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Welcome to ShowQ. We respect your privacy and are committed to protecting your personal data.
                                This privacy policy will inform you about how we look after your personal data when you visit
                                our platform and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We may collect, use, store and transfer different kinds of personal data about you:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li><strong className="text-white">Identity Data:</strong> First name, last name, username</li>
                                <li><strong className="text-white">Contact Data:</strong> Email address, phone number</li>
                                <li><strong className="text-white">Transaction Data:</strong> Payment details, purchase history, booking information</li>
                                <li><strong className="text-white">Technical Data:</strong> IP address, browser type, device information</li>
                                <li><strong className="text-white">Usage Data:</strong> How you use our platform, viewing preferences, search history</li>
                                <li><strong className="text-white">Marketing Data:</strong> Your preferences for receiving marketing communications</li>
                            </ul>
                        </section>

                        {/* How We Use Your Information */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We use your personal data for the following purposes:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li>To register you as a new customer and manage your account</li>
                                <li>To process and deliver your movie bookings and purchases</li>
                                <li>To manage payments, fees, and charges</li>
                                <li>To provide customer support and respond to your queries</li>
                                <li>To personalize your experience and provide recommendations</li>
                                <li>To send you marketing communications (with your consent)</li>
                                <li>To improve our platform and develop new features</li>
                                <li>To ensure security and prevent fraud</li>
                            </ul>
                        </section>

                        {/* Data Security */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We have implemented appropriate security measures to prevent your personal data from being
                                accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal
                                data to those employees, agents, and contractors who have a business need to know.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                All payment transactions are encrypted using industry-standard SSL technology. We do not
                                store your full credit card details on our servers.
                            </p>
                        </section>

                        {/* Data Retention */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We will only retain your personal data for as long as necessary to fulfill the purposes for
                                which we collected it, including for the purposes of satisfying any legal, accounting, or
                                reporting requirements. Account data is retained until you request deletion or we determine
                                the account is inactive for an extended period.
                            </p>
                        </section>

                        {/* Your Rights */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Your Legal Rights</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Under data protection laws, you have rights including:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                <li><strong className="text-white">Access:</strong> Request access to your personal data</li>
                                <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
                                <li><strong className="text-white">Erasure:</strong> Request deletion of your personal data</li>
                                <li><strong className="text-white">Object:</strong> Object to processing of your personal data</li>
                                <li><strong className="text-white">Restriction:</strong> Request restriction of processing</li>
                                <li><strong className="text-white">Portability:</strong> Request transfer of your data</li>
                                <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent at any time</li>
                            </ul>
                        </section>

                        {/* Cookies */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We use cookies and similar tracking technologies to track activity on our platform and hold
                                certain information. Cookies help us provide a better user experience by remembering your
                                preferences and understanding how you use our platform. You can instruct your browser to
                                refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        {/* Third-Party Services */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may share your data with trusted third-party service providers who assist us in operating
                                our platform, conducting our business, or serving our users. These parties are obligated to
                                keep your information confidential and use it only for the purposes for which we disclose it
                                to them. This includes payment processors, hosting providers, and analytics services.
                            </p>
                        </section>

                        {/* Changes to Policy */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by
                                posting the new Privacy Policy on this page and updating the "Last updated" date. You are
                                advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you have any questions about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                <p className="text-gray-300">Email: <a href="mailto:privacy@showq.com" className="text-red-400 hover:text-red-300">privacy@showq.com</a></p>
                                <p className="text-gray-300 mt-2">Address: ShowQ Privacy Team, Ahmedabad , Gujarat, India </p>
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

export default Privacy;
