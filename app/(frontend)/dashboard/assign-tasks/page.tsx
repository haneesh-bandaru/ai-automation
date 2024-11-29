'use client'

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Task {
    task_id: string
    task_name: string
    time_allocated: string
    tech_stack: string
}

interface Phase {
    phase: string
    description: string
    duration: string
    tasks: Task
}

interface ProjectData {
    project_name: string
    phases: Phase[]
    project_timeline: string
    budget_estimation: Record<string, { range: string }>
    security_considerations: string[]
    risks_and_mitigations: { risk: string; mitigation: string }[]
    technology_stack: {
        frontend: string[]
        backend: string[]
        database: string[]
        authentication: string[]
        storage: string[]
        encryption: string
        push_notifications: string
    }
    features: string[]
}

export default function TasksPage() {
    const searchParams = useSearchParams()
    const [projectData, setProjectData] = useState<ProjectData | null>(null)

    useEffect(() => {
        const data = searchParams.get('data') ? JSON.parse(decodeURIComponent(searchParams.get('data') as string)) : null
        if (data && data.response && data.response.response) {
            setProjectData(data.response.response)
        }
    }, [searchParams])

    if (!projectData) {
        return <div className="flex items-center justify-center h-full">Loading project data...</div>
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>

            <div className="space-y-6 p-4 h-screen">
                <h1 className="text-3xl p-4 font-bold text-gray-900">{projectData?.project_name}</h1>
                <Tabs defaultValue="overview" className="space-y-4 ">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="phases">Phases</TabsTrigger>
                        <TabsTrigger value="budget">Budget</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="risks">Risks</TabsTrigger>
                        <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Timeline: {projectData?.project_timeline}</p>
                                <h3 className="text-xl font-semibold mt-4 mb-2">Features</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {projectData?.features?.map((feature, index) => (
                                        <li key={index} className="text-gray-600">{feature}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="phases">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Phases</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[600px]">
                                    {projectData?.phases?.map((phase, index) => (
                                        <Card key={index} className="mb-4">
                                            <CardHeader>
                                                <CardTitle>{phase?.phase}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600"><strong>Description:</strong> {phase?.description}</p>
                                                <p className="text-gray-600"><strong>Duration:</strong> {phase?.duration}</p>
                                                <h4 className="text-lg font-semibold mt-2 mb-1">Tasks</h4>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Task ID</TableHead>
                                                            <TableHead>Task Name</TableHead>
                                                            <TableHead>Time Allocated</TableHead>
                                                            <TableHead>Tech Stack</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>{phase?.tasks.task_id}</TableCell>
                                                            <TableCell>{phase?.tasks.task_name}</TableCell>
                                                            <TableCell>{phase?.tasks.time_allocated}</TableCell>
                                                            <TableCell>{phase?.tasks.tech_stack}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="budget">
                        <Card>
                            <CardHeader>
                                <CardTitle>Budget Estimation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Range</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object?.entries(projectData?.budget_estimation).map(([category, { range }], index) => (
                                            <TableRow key={index}>
                                                <TableCell>{category}</TableCell>
                                                <TableCell>{range}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Considerations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                    {projectData?.security_considerations?.map((consideration, index) => (
                                        <li key={index} className="text-gray-600">{consideration}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="risks">
                        <Card>
                            <CardHeader>
                                <CardTitle>Risks and Mitigations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Risk</TableHead>
                                            <TableHead>Mitigation</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projectData?.risks_and_mitigations?.map(({ risk, mitigation }, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{risk}</TableCell>
                                                <TableCell>{mitigation}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="tech-stack">
                        <Card>
                            <CardHeader>
                                <CardTitle>Technology Stack</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {Object?.entries(projectData?.technology_stack)?.map(([category, techs]) => (
                                        <Card key={category}>
                                            <CardHeader>
                                                <CardTitle className="text-lg capitalize">{category}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc pl-4 space-y-1">
                                                    {Array?.isArray(techs) ? techs?.map((tech, index) => (
                                                        <li key={index} className="text-gray-600">{tech}</li>
                                                    )) : (
                                                        <li className="text-gray-600">{techs}</li>
                                                    )}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Suspense>
    )
}

