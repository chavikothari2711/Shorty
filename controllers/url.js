import urlModel from "../models/url.js";
import { nanoid } from "nanoid";
import qrcode from "qrcode"

export const handleGenerateURL= async(req,res) =>{
    try {
        const {redirectURL} = req.body;
        if(!redirectURL){
            return res.status(200).send({
                success:false,
                message:"redirected URL is required",
            })
        }
        const shortID = nanoid(8);
        const url = await urlModel({
            shortID,
            redirectURL,
            visitHistory:[]

        }).save();
        return res.status(200).send({
            success:true,
            message:"short url is generated",
            url,
            protocol:req.protocol + '://' + req.get('host') +"/" + url.shortID
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error at server end",
            error
        })
    }
}

export const handleEntryUpdate = async(req,res) => {
    const {shortID} = req.params;
    let today = new Date;
    const date = today.getDate() + "/" + (parseInt(today.getMonth())+1) + "/" + today.getFullYear();
    const time = today.getHours() + ":" +today.getMinutes() + ":" + today.getSeconds();
    try {
        const findUrl = await urlModel.findOne({shortID});
        if(!findUrl){
            return res.status(201).send({
                success:false,
                message:"such URL is not present please check!"
            })
        }

        const findURL = await urlModel.findOneAndUpdate({
            shortID
        },{
            $push: {
                visitHistory: {timestamps: Date.now(),date,time}
            }
        })

        res.redirect(findURL.redirectURL)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error at server end",
            error
        })
    }
}

export const handleGetAnalytics = async(req,res)=>{
    try {
        const {shortID} = req.params;
        const findURL = await urlModel.findOne({shortID});
        if(!findURL){
            return res.status(200).send({
                success:false,
                message:"Such URL doesn't exist",
            })
        }
        return res.status(200).send({
            success:true,
            message:"Found the analysis",
            url:findURL.redirectURL,
            id:findURL.shortID,
            totaLNoOfClicks:findURL.visitHistory.length,
            analysis:findURL.visitHistory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error at server end",
            error 
        })
    }
}

export const handleGenerateQrCode = async(req,res) => {
    try {
        const {redirectURL} = req.body;
        if(!redirectURL){
            return res.status(200).send({
                success:false,
                message:"redirected URL is required",
            })
        }
        const shortID = nanoid(8);
        const url = await urlModel({
            shortID,
            redirectURL,
            visitHistory:[]

        }).save();

        //qr code
        const opts = {
            errorCorrectionLevel: "H",
            type:"image/jpeg",
            quality:0.3,
            margin:1.2,
            color:{
                dark:"#F26600",
                light:"#FFFFFF"
            },
            width:250
        }

        const ShortURL = req.protocol + '://' + req.get('host') +"/" + url.shortID;

        qrcode.toDataURL(ShortURL,opts,(err,src)=>{
            if(!err){
                return res.status(200).send({
                    success:true,
                    message:"qrCode is generated",
                    url,
                    ShortURL,
                    src
                });
            }
            else{
                return res.status(200).send({
                    success:false,
                    message:"qrCode is not generated",
                    err
                });
            }
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error at server side",
            error
        })
    }
}

