import { db } from "@/config/db";
import { Transactions } from "@/config/schema";
import { useUser } from "@clerk/nextjs";


export const AddTransaction = async ( amount: number) => {
    const {user} = useUser()
    const res = db.insert(Transactions).values({
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        amount: amount,
    }).returning({
        id: Transactions.id,
        amount: Transactions.amount,
    })
    return res;
    
}