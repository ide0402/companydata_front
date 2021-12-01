import React,{ useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const Header = () => {  
    const [active, setActive] = useLocalStorage("active_status", "default");

    return(
        <div className="header-contents">
            <div className="hedader-upper display-5"></div>
            <Navbar id="customize-nav-bar">
                <Container>
                <Nav
                    activeKey={active}
                    onSelect={ (selectedKey) => setActive(selectedKey) }
                    className="customize-nav mr-auto"
                >
                    <NavItem id="customize-nav-item">
                        <Nav.Link as={ Link } id="customize-nav-link" to="/" eventKey="default">Top</Nav.Link>
                    </NavItem>
                    <NavItem id="customize-nav-item">
                        <Nav.Link as={ Link } id="customize-nav-link" to="/search" eventKey="key-1">企業検索</Nav.Link>                        
                    </NavItem>
                </Nav>
                </Container>
            </Navbar>
            <div className="header-title py-4 text-center">
                <div className="container">Listed Company Index</div>
            </div>
        </div>
    )
}

// Hook
function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
          // Get from local storage by key
          const item = window.localStorage.getItem(key);
          // Parse stored json or if none return initialValue
          return item ? JSON.parse(item) : initialValue;
        } catch (error) {
          // If error also return initialValue
          console.log(error);
          return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
                // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}
