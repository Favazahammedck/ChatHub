// import { ArrowLeft, User, Bell, Globe, Key, Database, Moon, Sun } from 'lucide-react';
// import { useState } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Switch } from './ui/switch';
// import { Avatar, AvatarFallback } from './ui/avatar';
// import { Progress } from './ui/progress';
// import { Separator } from './ui/separator';
// import { Page } from '../App';

// interface SettingsPageProps {
//   onNavigate: (page: Page) => void;
// }

// export function SettingsPage({ onNavigate }: SettingsPageProps) {
//   const [darkMode, setDarkMode] = useState(false);
//   const [showApiKey, setShowApiKey] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#F9FAFB]">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => onNavigate('dashboard')}
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <h1 className="text-[#1F2937]">Settings</h1>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
//         {/* Profile Section */}
//         <Card className="p-6">
//           <h2 className="text-[#1F2937] mb-6">Profile</h2>
//           <div className="flex items-start gap-6 mb-6">
//             <Avatar className="w-20 h-20">
//               <AvatarFallback className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white text-2xl">
//                 <User className="w-10 h-10" />
//               </AvatarFallback>
//             </Avatar>
//             <div className="flex-1 space-y-4">
//               <div>
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input id="name" defaultValue="Alex Student" className="mt-1" />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   defaultValue="alex.student@university.edu"
//                   className="mt-1"
//                 />
//               </div>
//             </div>
//           </div>
//           <Button className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
//             Save Changes
//           </Button>
//         </Card>

//         {/* Preferences */}
//         <Card className="p-6">
//           <h2 className="text-[#1F2937] mb-6">Preferences</h2>
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 {darkMode ? (
//                   <Moon className="w-5 h-5 text-[#6366F1]" />
//                 ) : (
//                   <Sun className="w-5 h-5 text-[#F59E0B]" />
//                 )}
//                 <div>
//                   <Label>Dark Mode</Label>
//                   <p className="text-[#6B7280]">Toggle dark mode theme</p>
//                 </div>
//               </div>
//               <Switch checked={darkMode} onCheckedChange={setDarkMode} />
//             </div>

//             <Separator />

//             <div className="space-y-2">
//               <Label htmlFor="default-ai">Default AI Model</Label>
//               <Select defaultValue="chatgpt">
//                 <SelectTrigger id="default-ai">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="chatgpt">ChatGPT-4</SelectItem>
//                   <SelectItem value="gemini">Gemini</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="language">Language</Label>
//               <Select defaultValue="en">
//                 <SelectTrigger id="language">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="en">English</SelectItem>
//                   <SelectItem value="es">Spanish</SelectItem>
//                   <SelectItem value="fr">French</SelectItem>
//                   <SelectItem value="de">German</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <Separator />

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Bell className="w-5 h-5 text-[#6366F1]" />
//                 <div>
//                   <Label>Notifications</Label>
//                   <p className="text-[#6B7280]">Receive study reminders</p>
//                 </div>
//               </div>
//               <Switch defaultChecked />
//             </div>
//           </div>
//         </Card>

//         {/* Usage Stats */}
//         <Card className="p-6">
//           <h2 className="text-[#1F2937] mb-6">Usage Statistics</h2>
//           <div className="space-y-6">
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <Label>API Calls This Month</Label>
//                 <span className="text-[#6B7280]">450 / 1000</span>
//               </div>
//               <Progress value={45} className="h-2" />
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <Label>Storage Used</Label>
//                 <span className="text-[#6B7280]">2.3 GB / 5 GB</span>
//               </div>
//               <Progress value={46} className="h-2" />
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
//               <div className="text-center">
//                 <p className="text-2xl text-[#6366F1] mb-1">147</p>
//                 <p className="text-[#6B7280]">Chats</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl text-[#14B8A6] mb-1">23</p>
//                 <p className="text-[#6B7280]">Files</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl text-[#F59E0B] mb-1">1,240</p>
//                 <p className="text-[#6B7280]">Questions</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl text-[#10B981] mb-1">89%</p>
//                 <p className="text-[#6B7280]">Accuracy</p>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* API Keys */}
//         <Card className="p-6">
//           <h2 className="text-[#1F2937] mb-6">API Keys</h2>
//           <p className="text-[#6B7280] mb-4">
//             Connect your own AI API keys for unlimited access
//           </p>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="openai-key">OpenAI API Key</Label>
//               <div className="flex gap-2 mt-1">
//                 <Input
//                   id="openai-key"
//                   type={showApiKey ? 'text' : 'password'}
//                   placeholder="sk-..."
//                   defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
//                 />
//                 <Button
//                   variant="outline"
//                   onClick={() => setShowApiKey(!showApiKey)}
//                 >
//                   {showApiKey ? 'Hide' : 'Show'}
//                 </Button>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="gemini-key">Google Gemini API Key</Label>
//               <div className="flex gap-2 mt-1">
//                 <Input
//                   id="gemini-key"
//                   type={showApiKey ? 'text' : 'password'}
//                   placeholder="AIza..."
//                   defaultValue="AIzaxxxxxxxxxxxxxxxxxxxxxxxx"
//                 />
//                 <Button
//                   variant="outline"
//                   onClick={() => setShowApiKey(!showApiKey)}
//                 >
//                   {showApiKey ? 'Hide' : 'Show'}
//                 </Button>
//               </div>
//             </div>

//             <Button className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
//               <Key className="w-4 h-4 mr-2" />
//               Save API Keys
//             </Button>
//           </div>
//         </Card>

//         {/* Danger Zone */}
//         <Card className="p-6 border-[#EF4444]">
//           <h2 className="text-[#EF4444] mb-4">Danger Zone</h2>
//           <div className="space-y-3">
//             <Button variant="outline" className="w-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10">
//               Clear All Chat History
//             </Button>
//             <Button variant="outline" className="w-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10">
//               Delete All Files
//             </Button>
//             <Button variant="outline" className="w-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10">
//               Delete Account
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }


import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Globe, Key, Database, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

export function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-[#1F2937]">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Section */}
        <Card className="p-6">
          <h2 className="text-[#1F2937] mb-6">Profile</h2>
          <div className="flex items-start gap-6 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white text-2xl">
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Alex Student" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="alex.student@university.edu"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
            Save Changes
          </Button>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <h2 className="text-[#1F2937] mb-6">Preferences</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-[#6366F1]" />
                ) : (
                  <Sun className="w-5 h-5 text-[#F59E0B]" />
                )}
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-[#6B7280]">Toggle dark mode theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="default-ai">Default AI Model</Label>
              <Select defaultValue="chatgpt">
                <SelectTrigger id="default-ai">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chatgpt">ChatGPT-4</SelectItem>
                  <SelectItem value="gemini">Gemini</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#6366F1]" />
                <div>
                  <Label>Notifications</Label>
                  <p className="text-[#6B7280]">Receive study reminders</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Usage Stats */}
        <Card className="p-6">
          <h2 className="text-[#1F2937] mb-6">Usage Statistics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>API Calls This Month</Label>
                <span className="text-[#6B7280]">450 / 1000</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Storage Used</Label>
                <span className="text-[#6B7280]">2.3 GB / 5 GB</span>
              </div>
              <Progress value={46} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center">
                <p className="text-2xl text-[#6366F1] mb-1">147</p>
                <p className="text-[#6B7280]">Chats</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-[#14B8A6] mb-1">23</p>
                <p className="text-[#6B7280]">Files</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-[#F59E0B] mb-1">1,240</p>
                <p className="text-[#6B7280]">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-[#10B981] mb-1">89%</p>
                <p className="text-[#6B7280]">Accuracy</p>
              </div>
            </div>
          </div>
        </Card>

        {/* API Keys */}
        <Card className="p-6">
          <h2 className="text-[#1F2937] mb-6">API Keys</h2>
          <p className="text-[#6B7280] mb-4">
            Connect your own AI API keys for unlimited access
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="openai-key"
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="sk-..."
                  defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="gemini-key">Google Gemini API Key</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="gemini-key"
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="AIza..."
                  defaultValue="AIzaxxxxxxxxxxxxxxxxxxxxxxxx"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
              <Key className="w-4 h-4 mr-2" />
              Save API Keys
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-[#EF4444]">
          <h2 className="text-[#EF4444] mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10">
              Clear All Chat History
            </Button>
            <Button variant="outline" className="w-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10">
              Delete All Files
            </Button>
            <Button variant="outline" className="w-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10">
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}