import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Doctor availability updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password -email");
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
