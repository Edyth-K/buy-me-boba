'use client';

import { saveProfile } from "@/actions/profileInfoActions";

export default function ProfileInfoForm() {
    async function handleFormAction(formData: FormData) {
        const result = await saveProfile(formData);
        console.log(result);
    }

    return (
        <form action={handleFormAction}>
            <div className="bg-gray-200 p-4 rounded-lg">
                <div className="bg-gray-300 size-24 rounded-full p-4">Avatar</div>
                <div>Cover Image</div>
            </div>
            <div>
                <label className="block mt-4" htmlFor="usernameIn">Username</label>
                <input name="username" id="usernameIn" type="text" placeholder="username"/>
            </div>
            <div>
                <label className="block mt-4" htmlFor="displayNameIn">Display Name</label>
                <input name="displayName" id="displayNameIn" type="text" placeholder="display name" />
            </div>
            <div>
                <label className="block mt-4" htmlFor="bioIn">Bio</label>
                <textarea id="bioIn" name="bio" placeholder="bio"></textarea>
            </div>
            <div>
                <button className="bg-blue-300 px-4 py-2 rounded-lg mt-4">
                    save profile
                </button>
            </div>
        </form>
    );
}


