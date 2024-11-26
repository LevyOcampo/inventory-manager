const Navbar = ({show}) => {
    return(
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <ul>
                <li>
                    <a href="/home">Home</a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="/employee">Employees</a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="/equipment">Equipment</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar