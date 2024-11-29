import Link from "next/link"
import { Home, BarChart2, Shield, AlertTriangle, Server, List } from "lucide-react"

export function Sidebar() {
    return (
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <span className="text-white text-2xl font-semibold">Project Details</span>
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-1">
                    {[
                        { name: 'Overview', href: '#overview', icon: Home },
                        { name: 'Phases', href: '#phases', icon: BarChart2 },
                        { name: 'Budget', href: '#budget', icon: List },
                        { name: 'Security', href: '#security', icon: Shield },
                        { name: 'Risks', href: '#risks', icon: AlertTriangle },
                        { name: 'Tech Stack', href: '#tech-stack', icon: Server },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        >
                            <item.icon className="mr-3 h-6 w-6" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

