import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function logout(){
 localStorage.removeItem('currentUser')
 window.location.href='./login'
  }
  function capitalizeFirstWord(name) {
    if (!name) return "";
    const words = name.split(" ");
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    return words.join(" ");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <b><a className="navbar-brand" href="/" style={{ color: "#5d4829" }}>
          Massage Reservation
        </a></b>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        
        >
          <span className="navbar-toggler-icon" ><i class="fa fa-bars" style={{color:'white', backgroundColor: 'black'}}></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-3">
            {user ? (
              <>
                <div className="dropdown dpnav"   >
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "black", color: "white", borderColor: "black" }}
                  >
                  <i className="fa fa-user"></i> {capitalizeFirstWord(user.name)}

                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="/profile">
                     Profile
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                    
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
