"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, Users, Calendar, Award, Clock, TrendingUp } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user] = useState({
    name: "John Smith",
    role: "Student",
    id: "STU001"
  })

  const courses = [
    { id: 1, name: "Computer Science 101", progress: 75, assignments: 3, quizzes: 2, grade: "A-" },
    { id: 2, name: "Mathematics for CS", progress: 60, assignments: 2, quizzes: 1, grade: "B+" },
    { id: 3, name: "Data Structures", progress: 90, assignments: 1, quizzes: 3, grade: "A" },
    { id: 4, name: "Web Development", progress: 45, assignments: 4, quizzes: 2, grade: "B" }
  ]

  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Badge variant="secondary">{user.role}</Badge>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <Link href="/" className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-700">
              <BookOpen className="h-4 w-4" /><span>Dashboard</span>
            </Link>
            <Link href="/courses" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700">
              <FileText className="h-4 w-4" /><span>Courses</span>
            </Link>
            <Link href="/assignments" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700">
              <Users className="h-4 w-4" /><span>Assignments</span>
            </Link>
            <Link href="/quizzes" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700">
              <Calendar className="h-4 w-4" /><span>Quizzes</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">4</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">10</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">B+</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">24</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your progress across all enrolled courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{course.name}</span>
                  <Badge>{course.grade}</Badge>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{course.progress}% complete</span>
                  <span>{course.assignments} assignments, {course.quizzes} quizzes</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
