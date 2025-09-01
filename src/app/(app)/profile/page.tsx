
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
       <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src="https://picsum.photos/200" data-ai-hint="person face" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-3xl">User Name</CardTitle>
              <CardDescription>Member since 2024</CardDescription>
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
