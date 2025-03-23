"use client"

import { useAuth } from "@/lib/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Mail, User2, Clock, FileText, Activity } from "lucide-react"

export default function PatientProfile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Basic Info Card */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center space-x-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-3xl text-gray-800 dark:text-white">{user.name}</CardTitle>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{user.age} years old</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Information Tabs */}
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="pt-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full justify-start border-b mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="medical">Medical Information</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
                    <User2 className="w-5 h-5" />
                    Basic Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="text-gray-800 dark:text-white font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                      <p className="text-gray-800 dark:text-white font-medium capitalize">{user.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-800 dark:text-white font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                      <p className="text-gray-800 dark:text-white font-medium">{user.age} years</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
                    <CalendarDays className="w-5 h-5" />
                    Date Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                      <p className="text-gray-800 dark:text-white font-medium">
                        {new Date(user.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                      <p className="text-gray-800 dark:text-white font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white mb-4">
                    <Activity className="w-5 h-5" />
                    Current Complaints
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.complaints?.map((complaint, index) => (
                      <Badge key={index} className="bg-[#06b6d4]/10 text-[#06b6d4] hover:bg-[#06b6d4]/20">
                        {complaint}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white mb-4">
                    <FileText className="w-5 h-5" />
                    Additional Notes
                  </h3>
                  <Card className="bg-gray-50 dark:bg-gray-700">
                    <CardContent className="p-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        {user.additionalComplaints || "No additional notes provided."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Session History</h3>
                <Card className="bg-gray-50 dark:bg-gray-700">
                  <CardContent className="p-4">
                    <p className="text-gray-600 dark:text-gray-300">No previous sessions recorded yet.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

