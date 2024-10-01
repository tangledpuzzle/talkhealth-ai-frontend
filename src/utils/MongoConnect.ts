import mongoose from 'mongoose'

export const connectToDatabase = async () => {
   try {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);   
    } catch (error) {
       console.error("Error in Mongo Db connection", error)
      //  process.exit(1);
    }
}
