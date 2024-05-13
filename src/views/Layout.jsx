import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import Navbar from '../components/Navbar'
import './styles.css'

export default function Layout() {
    return (
        <div>

            <Navbar />
            <SwitchTransition>
                <CSSTransition timeout={200} classNames='my-node' key={useLocation().pathname}>

                    <div className='max-w-6xl mx-auto p-3'>
                        <Outlet />
                    </div>

                </CSSTransition>
            </SwitchTransition>

        </div>
    )
}
