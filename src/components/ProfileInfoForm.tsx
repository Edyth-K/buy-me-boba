'use client';

import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import toast from "react-hot-toast";


type Props = {
    profileInfo: ProfileInfo|null;
}

export default function ProfileInfoForm({profileInfo}:Props) {

    const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
    const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);
    const placeHolder = 'http://edyth-buymeboba.s3.us-east-2.amazonaws.com/q4glvokqy7g.svg';

    async function handleFormAction(formData: FormData) {
        const savePromise = new Promise<void>(async (resolve, reject) => {
            const result = await saveProfile(formData);
            resolve();
        })

        toast.promise(
            savePromise,
             {
               loading: 'Saving...',
               success: <b>Settings saved!</b>,
               error: <b>Could not save.</b>,
             }
        );
       
    }

    return (
        <form action={handleFormAction}>
            <div className="relative border bg-gray-100 rounded-lg h-48 mb-8">
                <Image 
                    src={coverUrl || placeHolder} 
                    alt="cover"
                    width={1024}
                    height={1024}
                    className="w-full h-48 object-cover object-center rounded-lg"
                />

                <div className="absolute left-4 -bottom-4 border size-24 bg-gray-100 rounded-lg">
                    <div className="rounded-lg size-24 overflow-hidden">
                        <Image 
                            src={profileInfo?.avatarUrl || placeHolder} 
                            alt="avatar"
                            width={120}
                            height={120}
                            
                        />
                    </div>
                    <div className="absolute -bottom-2 -right-2">
                        <UploadButton onUploadComplete={setAvatarUrl} />
                    </div>
                    <input type="hidden" name="avatarUrl" value={avatarUrl}/> 
                </div>

                <div className="absolute right-4 bottom-4">
                    <UploadButton  onUploadComplete={setCoverUrl} />                
                    <input type="hidden" name="coverUrl" value={coverUrl}/>              
                </div>

            </div>
            <div>
                <label className="block mt-4" htmlFor="usernameIn">Username</label>
                <input 
                    defaultValue={profileInfo?.username}
                    name="username"
                    id="usernameIn"
                    type="text"
                    placeholder="username"
                />
            </div>
            <div>
                <label className="block mt-4" htmlFor="displayNameIn">Display Name</label>
                <input 
                    defaultValue={profileInfo?.displayName}
                    name="displayName"
                    id="displayNameIn"
                    type="text"
                    placeholder="display name" 
                />
            </div>
            <div>
                <label className="block mt-4" htmlFor="bioIn">Bio</label>
                <textarea 
                    defaultValue={profileInfo?.bio}
                    id="bioIn"
                    name="bio"
                    placeholder="bio">
                </textarea>
            </div>
            <div>
                <button className="bg-blue-300 px-4 py-2 rounded-lg mt-4">
                    save profile
                </button>
            </div>
        </form>
    );
}


