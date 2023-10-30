import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

const navList = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'About us',
        url:  'aboutUs'
    },
    {
        name: 'Slices',
        url:'slices'
    },
    {
        name: 'Regular cakes',
        url: 'regular', 
    },
    {
        name:  'Contact us',
        url:  'contactUs'
    },
]

function Nav() {

    const [navig, setNavig] = useState(0)

    useEffect(() => {
        setNavig(JSON.parse(window.localStorage.getItem('navig')));
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem('navig', navig);
      }, [navig]);

    return (
        <div>
            <nav>
                <div className='nav_name'>
                    <img src="./img/karinas-logo.png" alt="" />
                </div>
                <ul>
               
                {
                    navList.map((obj, idx) => <Link key={idx}  style={{ textDecoration: 'none'}} to={obj.url}>
                    <li onClick={()=>setNavig(idx)} className={ navig === idx ? 'li_activ' :'nav_li' }>{obj.name}</li>
                </Link> )
                }
            
                    <div className="insta_icon">
                        <Link style={{ textDecoration: 'none' }} target='blank' to={"https://www.instagram.com/karinascakehouse/?utm_source=ig_embed&utm_campaign=loading"}>
                            <img className='insta_logo' src="./img/instagram.png" alt="our instagram" />
                        </Link>
                    </div>
                    <Search/>
                </ul >
            </nav >
        </div >
    )
}

export default Nav