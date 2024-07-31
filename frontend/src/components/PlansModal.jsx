import { useState } from 'react';
import Image from 'next/image';

const PlansModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto my-8 max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="bg-white py-8 px-4 lg:py-16 lg:px-6">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              Elige un plan y disfruta de organizar tu evento
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl">
              Ten en cuenta que puedes cambiar de plan en cualquier momento. Todo dependerá de la cantidad de invitados.
            </p>
          </div>
          <div className="flex justify-center space-x-9">
            <div className="bg-primary-600 flex flex-col p-6 max-w-lg text-center text-gray-900 bg-primary rounded-lg border border-gray-100 shadow-xl p-8 transition-transform duration-300 hover:scale-105">
              <h3 className="text-white mb-4 text-2xl font-semibold">Free</h3>
              <p className="font-light text-gray-100 sm:text-lg">Best option for personal use & for your next project.</p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold text-white">$0</span>
                <span className="text-gray-100">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">Individual configuration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">No setup, or hidden fees</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">Team size: <span className="font-semibold">1 developer</span></span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">Premium support: <span className="font-semibold">6 months</span></span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">Free updates: <span className="font-semibold">6 months</span></span>
                </li>
              </ul>
              <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get started</a>
            </div>

            <div className="bg-primary-600 flex flex-col p-6 max-w-lg text-center text-gray-900 bg-primary rounded-lg border border-gray-100 shadow-xl p-8 transition-transform duration-300 hover:scale-105">
              <h3 className="text-white mb-4 text-2xl font-semibold">Premium</h3>
              <p className="font-light text-gray-100 sm:text-lg">For larger companies & organizations with specific needs.</p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold text-white">$499</span>
                <span className="text-gray-100">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">Individual configuration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">No setup, or hidden fees</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">Team size: <span className="font-semibold">10 developers</span></span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">Premium support: <span className="font-semibold">24 months</span></span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-100">Free updates: <span className="font-semibold">24 months</span></span>
                </li>
              </ul>
              <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get started</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansModal;
