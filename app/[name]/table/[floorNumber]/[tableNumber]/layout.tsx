"use client";

import React, { PropsWithChildren } from "react";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
    <html>
        <body>
            <div className="overflow-hidden">{children}<ToastContainer /></div>
        </body>
    </html>
);

export default Layout;
