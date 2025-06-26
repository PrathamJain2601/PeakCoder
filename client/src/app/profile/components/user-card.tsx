import { formatDateReadable } from "@/lib/utilityFunction"
import { RootState } from "@/store/store"
import { Edit, Calendar, Mail, Shield } from "lucide-react"
import { useSelector } from "react-redux"

interface UserData {
  name: string
  username: string
  email: string
  role: "Admin" | "User" | "Moderator"
  joinedDate: string
  avatar: string
}

const mockUser: UserData = {
  name: "Alex Johnson",
  username: "@alexcoder",
  email: "alex.johnson@peakcoder.com",
  role: "Admin",
  joinedDate: "March 12, 2024",
  avatar: "/placeholder.svg?height=80&width=80",
}

export default function UserCard() {
  const user = useSelector((state: RootState) => state.user.user);
  if(user == null) return (<div>No user found</div>);
  return (
    <div className="bg-gray-800 rounded-xl px-6 py-3 mb-4 border border-gray-700 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-6">
          <div className="space-y-2">
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400 text-sm">{user.username}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <Mail size={14} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>Joined {formatDateReadable(user.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
