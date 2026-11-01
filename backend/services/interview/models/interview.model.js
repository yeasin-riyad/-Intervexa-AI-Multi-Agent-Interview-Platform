import mongoose from "mongoose";

const questionSchema= new mongoose.Schema({
    question:{
        type:String
    },
    userAnswer:{
        type:String,
        default:""
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        default:easy
    },
    timer:{
        default:60
    },

    feedback:{
        type:feedbackSchema,
        default:()=>({})

    }

},{_id:false})

const feedbackSchema= new mongoose.Schema({
    
})

const interviewSchema= new mongoose.Schema({
    userId:{

    },
    type:{
        enum:["hr","technical"]
    },
    role:{

    },
    useResume:{

    },
    currentQuestion:{
        type:Number,
        default:0
    },
    questions:{
        type:[questionSchema],
        default:[]
    },
    overallScore:{

    },
    strengths:{
        type:[
            String
        ],
        default:[]
    },

    weaknesses:{
        type:[String],
        default:[]
    },
    recommendations:{
        type:[String]
    },
    summary:{
        type:String
    },
    status:{
        type:String,
        enum:["in-progress","completed"],
        default:"in-progress"
    }
},{})