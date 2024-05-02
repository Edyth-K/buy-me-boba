'use server';

import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";

type Props = {
    params: {
        username: string;
    };
}

export default async function SingleProfilePage({params}:Props) {
    const username = params.username;
    await mongoose.connect(process.env.MONGODB_URI as string);
    const profileInfoDoc:ProfileInfo|null = await ProfileInfoModel.findOne({username})

    if (!profileInfoDoc) {
        return(
            <div>404 - profile not found</div>
        )
    }
    return(
        <div>
            <div>
                <Image 
                    src={profileInfoDoc.coverUrl}
                    width={2048}
                    height={2048}
                    alt="cover image" 
                    className="object-fit object-cover h-48"
                />
            </div>
            <div className="max-w-2xl px-2 mx-auto relative -mt-16">
                <div className="flex items-end gap-4">           
                    <div className="size-36 overflow-hidden rounded-xl border-2 border-blue-50">
                        <Image
                            src={profileInfoDoc.avatarUrl}
                            width={256}
                            height={256}
                            alt="cover image" 
                            className="size-36 object-cover object-center"
                        />
                    </div>
                    <div className="mb-2">
                        <h1 className="text-4xl">
                            {profileInfoDoc.displayName}
                        </h1>
                        <h2 className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faWineGlass} />
                            <span>/</span>
                            <span>{profileInfoDoc.username}</span>
                        </h2>
                    </div>
                </div>
            </div>

        </div>
    );
}