import './styles/markdown.css'
import './styles/tailwind.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Error } from './pages/Error/index.jsx'
import { Dashboard } from './pages/Dashboard/index.jsx'
import { WagmiProvider } from './contexts/Wagmi'

function App() {
    return (
        <WagmiProvider>
            <BrowserRouter>
                <Routes>
                    <Route index path="/*" element={<Dashboard />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </WagmiProvider>
    )
}

export default App
