import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="w-full bg-[#073b4c] border border-white">
                <div className=" mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between text-white">
                    <span className="text-sm text-body sm:text-center">© 2025 <a href="https://flowbite.com/" className="hover:underline">Israel Montiel™</a>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>

        </div>
    )
}

export default Footer
