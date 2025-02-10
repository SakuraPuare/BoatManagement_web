"use client";

import {useState} from "react";
import {User} from "@/types/user";
import UserDialog from "@/components/user-dialog";

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);

    const addUser = () => {
        setUser(null);
        console.log("addUser", user);
        setOpen(true);
    };

    const updateUser = () => {
        setUser({id: "1", name: "John Doe", email: "john.doe@example.com"});
        console.log("updateUser", user);
        setOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col gap-2">
                <button onClick={addUser}>Open with add</button>
                <button onClick={updateUser}>Open with update</button>
            </div>
            <UserDialog open={open} onOpenChange={setOpen} user={user}/>
        </div>
    );
}
