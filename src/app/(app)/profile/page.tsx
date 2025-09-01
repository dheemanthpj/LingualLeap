
'use client'

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
       <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src={user?.photoURL || `https://avatar.vercel.sh/${user?.email}.png`} data-ai-hint="person face" />
              <AvatarFallback>{user?.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-3xl">{user?.displayName || 'User Name'}</CardTitle>
              <CardDescription>Email: {user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>This is your profile page. More account settings and details will be available here in the future.</p>
        </CardContent>
       </Card>
    </div>
  );
}
