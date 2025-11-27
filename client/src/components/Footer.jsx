import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className='text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>

                {/* Logo & Social */}
                <div className='max-w-80'>
                    <img src={assets.logo} alt="logo" className='mb-4 h-10 md:h-20' />
                    <p className='text-sm'>
                        A dynamic movie trailer platform showcasing latest releases with smooth video playback, interactive thumbnails, and modern cinematic design.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/chauhan_ajay_2108/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg className="w-5 h-5 hover:text-pink-500 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm9.5 1a4 4 0 11-4 4 4 4 0 014-4zm0 1.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zm3.5-.75a.75.75 0 11.75-.75.75.75 0 01-.75.75z" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/ajay-chauhan07/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg className="w-5 h-5 hover:text-blue-500 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
                            </svg>
                        </a>
                        {/* GitHub */}
                        <a href="https://github.com/ChauhanAjay1669" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <svg className="w-5 h-5 hover:text-white transition-colors cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Company Links */}
                <div>
                    <p className='text-lg text-gray-600'>Company</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/movies" className="hover:text-white">Movies</Link></li>
                        <li><Link to='/release' className="hover:text-white text-left">Release</Link></li>
                        <li><Link to='/theaters' className="hover:text-white text-left">Theaters</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <p className='text-lg text-gray-600'>SUPPORT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a className="hover:text-white text-left" href="#">Help Center</a></li>
                        <li><a className="hover:text-white text-left" href="#">Safety Information</a></li>
                        <li><a className="hover:text-white text-left" href="#">Cancellation Options</a></li>
                        <li><a className="hover:text-white text-left" href="#">Contact Us</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className='max-w-80'>
                    <p className='text-lg text-gray-600'>STAY UPDATED</p>
                    <p className='mt-3 text-sm'>
                        Subscribe to our newsletter <span className='text-primary-dull'>S</span>howQ for New Movies.
                    </p>
                    <div className='flex items-center mt-4'>
                        <input
                            type="text"
                            className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none'
                            placeholder='Your email'
                        />
                        <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'>
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()}. <span className='text-gray-600 hover:text-primary-dull'>S<span className='text-gray-600 hover:text-white'>howQ</span></span> All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><Link to="/privacy" className="hover:text-primary-dull transition-colors">Privacy</Link></li>
                    <li><Link to="/terms" className="hover:text-primary-dull transition-colors">Terms</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
