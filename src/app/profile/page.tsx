'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User, Edit, Save, Upload, School, CreditCard } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db, createDocument, readDocument } from '@/lib/firebase';


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
  const [originalSchool, setOriginalSchool] = useState(''); // State to track the original school value
  const [bio, setBio] = useState(''); // New bio field
  const [originalBio, setOriginalBio] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
        // Load profile using helper readDocument
        (async () => {
          try {
            const data = await readDocument(`users/${user.uid}`);
            if (data) {
              const nameFromDoc = (data as any).name || (data as any).displayName || '';
              setDisplayName(nameFromDoc || user.displayName || '');
              setOriginalName(nameFromDoc || user.displayName || '');

              setBio((data as any).bio || '');
              setOriginalBio((data as any).bio || '');

              setSchool((data as any).school || '');
              setOriginalSchool((data as any).school || '');
            } else {
              setSchool('');
              setOriginalSchool('');
              setBio('');
              setOriginalBio('');
              setOriginalName(user.displayName || '');
            }
          } catch (err) {
            console.error('Error loading user profile document:', err);
            setSchool('');
            setOriginalSchool('');
            setBio('');
            setOriginalBio('');
            setOriginalName(user.displayName || '');
          }
        })();
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
        photoURL: updatedPhotoURL || undefined,
      });

      // Save the 'school', name and bio using helper createDocument
      try {
        await createDocument(`users/${user.uid}`, { name: displayName, bio, school });
        setOriginalSchool(school);
        setOriginalBio(bio);
        setOriginalName(displayName);
      } catch (err) {
        console.error('Error saving school to Firestore:', err);
        throw err;
      }

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
        setSchool(originalSchool || ''); // Reset school field to last saved value
        setBio(originalBio || '');
        setDisplayName(originalName || user.displayName || '');
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
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Edit className="h-5 w-5" />
                </Button>
                {process.env.NODE_ENV === 'development' && user && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      try {
                        console.log('current uid:', user.uid);
                        if (user.uid && typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(user.uid);
                          toast({ title: 'UID copied to clipboard', description: user.uid });
                        } else {
                          toast({ title: 'UID', description: String(user.uid) });
                        }
                      } catch (err) {
                        console.error('Error copying UID:', err);
                        toast({ title: 'Error', description: 'Could not copy UID', variant: 'destructive' });
                      }
                    }}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                )}
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="bio">Bio / About You</Label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a little about yourself"
                  className="w-full rounded-md border p-2 min-h-[80px]"
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
