import './styles/markdown.css'
import './styles/tailwind.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/index.jsx'
import { Error } from './pages/Error/index.jsx'
import { Dashboard } from './pages/Dashboard/index.jsx'
import { WagmiProvider } from './contexts/Wagmi'

function App() {
    return (
        <WagmiProvider>
            <BrowserRouter>
                <Routes>
                    <Route index path="/creation/*" element={<Dashboard />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </WagmiProvider>
    )
}

export default App
