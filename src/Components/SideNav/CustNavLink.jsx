import { Link, useMatch } from "react-router-dom";

  const   CustNavLink = ({ to, children }) => {
    const match = useMatch(to);
  
    const activeLinkStyle = {
      color: 'red', 
      // Set your desired active color here
      // Add any other styling you want for the active link
    };
  
    return (
      <Link to={to} style={match && activeLinkStyle } >
        {children}
      </Link>
    );
  };
  export default CustNavLink;

  