"use client";

import React, { PropsWithChildren } from "react";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
    <html>
        <body>
            <div className="p-5">{children}<ToastContainer /></div>
        </body>
    </html>
);

export default Layout;
