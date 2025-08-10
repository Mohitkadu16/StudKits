
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile, uploadProfilePhoto } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User, Edit, Save, Upload, School, CreditCard } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';


// Wrapper for updating user profile
async function updateUserProfileClient(user: import('firebase/auth').User, profileData: { displayName?: string; photoURL?: string }) {
  if (!user) throw new Error("User not authenticated");
  await updateProfile(user, profileData);
};

// Wrapper for uploading profile photo
async function uploadProfilePhotoClient(userId: string, file: File): Promise<string> {
  const storageRef = ref(storage, `profile_photos/${userId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};


export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [school, setSchool] = useState(''); // New state for school/college
  const [photoURL, setPhotoURL] = useState('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
        // Note: 'school' is not part of the default Firebase user object.
        // In a real app, you would fetch this from a separate user profile collection in Firestore.
        // For now, we'll just manage it in the component's state.
        setSchool(''); // Initialize as empty
      } else {
        router.push('/login');
      }
    }
  }, [user, authLoading, router]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPhoto(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      let updatedPhotoURL = user.photoURL;

      if (newPhoto) {
        updatedPhotoURL = await uploadProfilePhotoClient(user.uid, newPhoto);
      }

      await updateUserProfileClient(user, {
        displayName: displayName,
        photoURL: updatedPhotoURL,
      });

      // In a real app, you'd save the 'school' field to your user profile collection in Firestore here.
      // For example: await saveUserProfileData(user.uid, { school: school });

      setPhotoURL(updatedPhotoURL || '');

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      setIsEditing(false);
      setNewPhoto(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: 'Could not update your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form fields to their original state
    if(user) {
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
        setSchool(''); // Reset school field
    }
    setNewPhoto(null);
  }

  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-2xl">
            <div className="flex items-center">
              <User className="mr-3 h-7 w-7 text-primary" />
              User Profile
            </div>
            {!isEditing && (
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Edit className="h-5 w-5" />
              </Button>
            )}
          </CardTitle>
          <CardDescription>View and edit your profile details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={photoURL} alt={displayName} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
                  <Upload className="h-4 w-4" />
                  <Input id="photo-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} disabled={isSaving} />
                </Label>
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{isEditing ? displayName : user.displayName || 'New User'}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center text-muted-foreground pt-1">
                 <School className="mr-2 h-4 w-4" />
                 <span>{school || 'No school/college specified'}</span>
              </div>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={isSaving}
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="school">School / College</Label>
                <Input
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Enter your school or college"
                  disabled={isSaving}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancelEdit} disabled={isSaving}>Cancel</Button>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
      
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-3 h-6 w-6 text-primary"/>
            Payment Methods
          </CardTitle>
          <CardDescription>Manage your payment details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>Payment integration is coming soon!</p>
            <p className="text-sm">You'll be able to add and manage your payment methods here.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Project Tracking</CardTitle>
          <CardDescription>Track the progress of your ordered projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>Project tracking feature is coming soon!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
