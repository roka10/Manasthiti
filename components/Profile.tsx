"use client"

import { useAuth } from "@/lib/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="w-16 h-16">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl text-gray-800 dark:text-white">{user.name}</CardTitle>
          <p className="text-gray-500 dark:text-gray-400">
            {user.age} yo • {user.complaints?.[0]}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="information" className="w-full">
          <TabsList className="w-full justify-start border-b mb-4">
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="information">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">General</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">First name</p>
                    <p className="text-gray-800 dark:text-white">{user.name.split(" ")[0]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last name</p>
                    <p className="text-gray-800 dark:text-white">{user.name.split(" ")[1] || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                    <p className="text-gray-800 dark:text-white">{user.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                    <p className="text-gray-800 dark:text-white">{user.gender}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Contact</h3>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-800 dark:text-white">{user.email}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="complaints">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {user.complaints?.map((complaint, index) => (
                  <Badge key={index} variant="secondary" className="bg-[#06b6d4]/10 text-[#06b6d4]">
                    {complaint}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">Patient notes and progress will be displayed here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

