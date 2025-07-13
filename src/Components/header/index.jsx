import './style.css'

const Header = () =>{
    return (
        <header className = 'app-header'>
            <div className='logo'>TimeNest</div>
            <nav className='nav-links'>
                <a href='/'>Home</a>
                <a href='/wall'>Wall</a>
                <a href='/profile'>Profile</a>
            </nav>
        </header>
    );
};

export default Header;