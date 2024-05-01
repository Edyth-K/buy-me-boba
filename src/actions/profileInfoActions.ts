'use server';
import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveProfile(formData: FormData) {
    // connect db
    await mongoose.connect(process.env.MONGODB_URI as string);
    const session = await getServerSession(authOptions);
    if (!session) throw 'you need to be logged in';
    const email = session.user?.email;
    const {
        username, displayName, bio
    } = Object.fromEntries(formData);
    
    // update or create depending on if it exists in db
    // find by email
    const profileInfoDoc = await ProfileInfoModel.findOne({email});
    if (profileInfoDoc) { // if profile exists, save info
        profileInfoDoc.set({username, displayName, bio});
        profileInfoDoc.save();
    } else { // else create new
        await ProfileInfoModel.create({username, displayName, bio, email});
    }

    return true;
    
} 