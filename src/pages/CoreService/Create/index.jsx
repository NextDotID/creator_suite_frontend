import { Routes, Route, Navigate } from 'react-router-dom'
import { Choose } from './Choose'
import { CreateService } from './CreateService'
import { Generate } from './Generate'
import { Prepare } from './Prepare'

export function Create() {
    return (
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <Routes>
                <Route path="/" element={<Generate />} />
                <Route path="/choose" element={<Choose />} />
                <Route path="/prepare" element={<Prepare />} />
                <Route path="/create" element={<CreateService />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}
