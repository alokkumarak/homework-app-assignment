import React from 'react'
import '../css/home.css'
import HomeBody from './HomeBody';
import SideNav from './SideNav';


function Home() {
    return (
      <div className="home">
        <div className="home_nav">
          <SideNav />
        </div>
        <div className="home_body">
            <HomeBody />
        </div>
      </div>
    );
}

export default Home
