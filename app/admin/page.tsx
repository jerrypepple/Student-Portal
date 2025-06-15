"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, FileText, Settings, TrendingUp, AlertCircle, Shield, User, GraduationCap } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const stats = {
    totalUsers: 1247,
    totalCourses: 45,
    activeAssignments: 128,
    systemAlerts: 3
  }

  const recentUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@university.edu", role: "student", status: "active" },
    { id: 2, name: "Dr. Mike Chen", email: "mike@university.edu", role: "instructor", status: "active" },
    { id: 3, name: "Sarah Williams", email: "sarah@university.edu", role: "student", status: "pending" }
  ]

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Badge variant="destructive" className="flex items-center space-x-1">
                <Shield className="h-3 w-3" /><span>Administrator</span>
              </Badge>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <Link href="/admin" className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-700">
              <TrendingUp className="h-4 w-4" /><span>Dashboard</span>
            </Link>
            <Link href="/admin/users" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-700">
              <Users className="h-4 w-4" /><span>Users</span>
            </Link>
            <Link href="/admin/courses" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-700">
              <BookOpen className="h-4 w-4" /><span>Courses</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.totalUsers}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.totalCourses}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.activeAssignments}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-red-600">{stats.systemAlerts}</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>Latest user registrations and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge>{user.role}</Badge>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
