import React from 'react';
import {Navbar,Nav,Container} from "react-bootstrap";
import './NavigationBar.css';
import {Link } from 'react-router-dom';
import logo from  '../../../../Resources/Images/navlogo-1.png';
import auth from './../../../../Firebase/Firebase.init';
import { useAuthState } from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import Loading from './../../../Loading/Loading';
import { toast } from 'react-toastify';

const NavigationBar = () => {
    const [user, loading, error] = useAuthState(auth);

    if(user){
        console.log("User Found!");
    }
    if (!user) {
      console.log("No Signed in User");
    }
    
    const handleSignOut=()=>{
        if(loading){
      <Loading></Loading>
    }
    signOut(auth);
    toast.info("Signed Out Successfully");
    }
    return (
      <div>
        <div className="nav-container">
          <div className="nav-title-container">
            <div className="nav-logo">
              <img src={logo} alt="royal truckings bd" />
            </div>
            <div className="nav-title">
              <p id="text-title">Royal Truckings BD LTD.</p>
            </div>
          </div>
          <div className="nav-items">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blogs">Blogs</Link>
            {user ? (
              <>
                <Link to="inventories">Manage Inventories</Link>
                <Link to="myitems">My Items</Link>
                <Link to="/home" onClick={handleSignOut}>
                  {" "}
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default NavigationBar;