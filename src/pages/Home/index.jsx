import { Link } from 'react-router-dom'

export function Home() {
    return (
        <>
            <h1>Core Service</h1>
            <ul>
                <li>
                    <Link to="/creation">&gt; Creator Suite</Link>
                </li>
                <li>
                    <Link to="/core-service">&gt; Core Service</Link>
                </li>
            </ul>
        </>
    )
}
