import validator from 'validator'
import bcrypt from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address} = req.body
        
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Please fill all the fields"})
        }
        let doctorImage="";
        if(req.file){
            const response=await cloudinary.uploader.upload(req.file.path,{folder:"Medbridge/doctor"});
            doctorImage=response.secure_url
            console.log("Image link in cloudinary",doctorImage);
        }

        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8) {
            return res.json({success:false,message:"Password should be at least 8 characters long"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
       const doctorData={
           name,
           email,
           password:hashedPassword,
           speciality,
           degree,
           experience,
           about,
           fees,
           address:JSON.parse(address),
           image:doctorImage,
           date: Date.now()
       }
   const newDoctor=new doctorModel(doctorData)
   await newDoctor.save()
   res.json({success:true,message:"Doctor added successfully"})
    } catch (error) {
     console.log(error)
     res.json({success:false,message:error.message})
    }
}
const loginAdmin=async (req, res) => {
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
             res.json({success:false,message:"Invalid email or password"})
        }
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API to get all doctors list for admin panel

const allDoctors=async(req,res)=>{
    try{
      const doctors = await doctorModel.find({}).select('-password')
      res.json({success:true, doctors})
    }
    catch(error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }


}
const appointmentsAdmin=async(req,res)=>{
  try{
    const appointments=await appointmentModel.find({})
    res.json({success:true,appointments})
  }
  catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

const appointmentCancel = async (req, res) => {
    try {
        const {appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { doctorId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(doctorId);

        if (!doctorData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        let slots_booked = doctorData.slots_booked || {};

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
            await doctorModel.findByIdAndUpdate(doctorId, { slots_booked });
        }

        res.json({ success: true, message: 'Appointment Cancelled' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
//api to get dashoboard data for admin panel
const adminDashboard=async(req,res)=>{
    try{
       const doctors= await doctorModel.find({})
       const users=await userModel.find({})
       const appointments=await appointmentModel.find({})
       const dashData={
        doctors:doctors.length,
        patients:users.length,
        appointments:appointments.length,
        latestAppointments:appointments.reverse().slice(0,5)
       }
       res.json({success:true,dashData})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export{addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}