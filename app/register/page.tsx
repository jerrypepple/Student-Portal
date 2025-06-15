"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, GraduationCap, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    studentId: "",
    program: "",
    yearOfStudy: "",
    department: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    privacyAccepted: false
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isRegistered, setIsRegistered] = useState(false)
  const router = useRouter()

  const programs = [
    "Computer Science", "Information Technology", "Software Engineering",
    "Data Science", "Cybersecurity", "Web Development"
  ]

  const departments = [
    "School of Computing", "School of Engineering", "School of Mathematics",
    "School of Business", "School of Sciences"
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
      if (!formData.gender) newErrors.gender = "Gender is required"
    }
    if (step === 2) {
      if (!formData.program) newErrors.program = "Program is required"
      if (!formData.yearOfStudy) newErrors.yearOfStudy = "Year of study is required"
      if (!formData.department) newErrors.department = "Department is required"
    }
    if (step === 3) {
      if (!formData.password) newErrors.password = "Password is required"
      if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
      if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions"
      if (!formData.privacyAccepted) newErrors.privacyAccepted = "You must accept the privacy policy"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(3)) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    const studentId = formData.studentId || `STU${Date.now().toString().slice(-6)}`
    const registrationData = { ...formData, studentId, registrationDate: new Date().toISOString(), status: "pending", role: "student" }
    const existingRegistrations = JSON.parse(localStorage.getItem("registrations") || "[]")
    existingRegistrations.push(registrationData)
    localStorage.setItem("registrations", JSON.stringify(existingRegistrations))
    setIsRegistered(true)
    setIsLoading(false)
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Registration Successful!</CardTitle>
            <CardDescription>Your account has been created successfully</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800"><strong>Student ID:</strong> {formData.studentId || `STU${Date.now().toString().slice(-6)}`}</p>
              <p className="text-sm text-blue-800 mt-1"><strong>Email:</strong> {formData.email}</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>Your registration is pending approval.</p>
              <p>You will receive an email confirmation once approved.</p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => router.push("/login")} className="w-full">Go to Login</Button>
              <Button variant="outline" onClick={() => router.push("/")} className="w-full">Back to Home</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} placeholder="Enter first name" className={errors.firstName ? "border-red-500" : ""} />
                {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} placeholder="Enter last name" className={errors.lastName ? "border-red-500" : ""} />
                {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="Enter email address" className={errors.email ? "border-red-500" : ""} />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="Enter phone number" className={errors.phone ? "border-red-500" : ""} />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => handleInputChange("dateOfBirth", e.target.value)} className={errors.dateOfBirth ? "border-red-500" : ""} />
                {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>}
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-red-500" : ""}><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="studentId">Student ID (Optional)</Label>
              <Input id="studentId" value={formData.studentId} onChange={(e) => handleInputChange("studentId", e.target.value)} placeholder="Leave blank to auto-generate" />
              <p className="text-xs text-gray-500 mt-1">If left blank, a student ID will be automatically generated</p>
            </div>
            <div>
              <Label htmlFor="program">Program *</Label>
              <Select value={formData.program} onValueChange={(value) => handleInputChange("program", value)}>
                <SelectTrigger className={errors.program ? "border-red-500" : ""}><SelectValue placeholder="Select your program" /></SelectTrigger>
                <SelectContent>
                  {programs.map((program) => <SelectItem key={program} value={program}>{program}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.program && <p className="text-sm text-red-500 mt-1">{errors.program}</p>}
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger className={errors.department ? "border-red-500" : ""}><SelectValue placeholder="Select your department" /></SelectTrigger>
                <SelectContent>
                  {departments.map((department) => <SelectItem key={department} value={department}>{department}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-sm text-red-500 mt-1">{errors.department}</p>}
            </div>
            <div>
              <Label htmlFor="yearOfStudy">Year of Study *</Label>
              <Select value={formData.yearOfStudy} onValueChange={(value) => handleInputChange("yearOfStudy", value)}>
                <SelectTrigger className={errors.yearOfStudy ? "border-red-500" : ""}><SelectValue placeholder="Select year of study" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                </SelectContent>
              </Select>
              {errors.yearOfStudy && <p className="text-sm text-red-500 mt-1">{errors.yearOfStudy}</p>}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} placeholder="Create a password" className={errors.password ? "border-red-500" : ""} />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} placeholder="Confirm your password" className={errors.confirmPassword ? "border-red-500" : ""} />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox id="termsAccepted" checked={formData.termsAccepted} onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)} className={errors.termsAccepted ? "border-red-500" : ""} />
                <Label htmlFor="termsAccepted" className="text-sm leading-5">I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms and Conditions</Link> *</Label>
              </div>
              {errors.termsAccepted && <p className="text-sm text-red-500">{errors.termsAccepted}</p>}
              <div className="flex items-start space-x-2">
                <Checkbox id="privacyAccepted" checked={formData.privacyAccepted} onCheckedChange={(checked) => handleInputChange("privacyAccepted", checked)} className={errors.privacyAccepted ? "border-red-500" : ""} />
                <Label htmlFor="privacyAccepted" className="text-sm leading-5">I agree to the <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link> *</Label>
              </div>
              {errors.privacyAccepted && <p className="text-sm text-red-500">{errors.privacyAccepted}</p>}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const stepTitles = ["Personal Information", "Academic Information", "Account Setup"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />Back to Login
          </Link>
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
          <p className="text-gray-600 mt-2">Create your student account to get started</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index + 1 <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>{index + 1}</div>
                <span className="text-xs text-gray-600 mt-1 text-center max-w-20">{title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / stepTitles.length) * 100}%` }} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep}: {stepTitles[currentStep - 1]}</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Please provide your basic personal information"}
              {currentStep === 2 && "Tell us about your academic background"}
              {currentStep === 3 && "Set up your account credentials"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
              {renderStep()}
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>Previous</Button>
                {currentStep < 3 ? <Button type="button" onClick={nextStep}>Next</Button> : <Button type="submit" disabled={isLoading}>{isLoading ? "Creating Account..." : "Create Account"}</Button>}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
