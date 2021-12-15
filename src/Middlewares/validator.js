import{check,validationResult} from "express-validator";

class Validator{

    static validateInput=(req,res,next)=>{
         const errors= validationResult(req);

         if (!errors.isEmpty()){

            const errrorMessage= errors.errors.map((err)=>err.msg)

            return res.status(400).json ({message: errrorMessage});
         }

         return next();

    };


    static newAccountRules(){


        return[

            check("email","invalid email ").trim().isEmail(),
            check("password","password is not strong ").trim().isStrongPassword(),
            check ("firstName","Name should be valid").trim().isAlpha(),
            check("lastName","last name should be valid").trim().isAlpha(),
            check("gender","select one").trim().isIn(["male","female","other","prefer-not-to-say"])



        ]
    }


    static newTourRules(){

        return[

            check("tourName", "Invalid Tour name").trim().isString(),
            check("tourDescription", "null description").trim().isString(),
            check("dateScheduled","the datescheduled is invalid").trim().isDate(),
            check("dueDate","Due date is invalid").trim().isDate(),
            check("location","invalid location").trim().isString(),
            check("seats", "invalid seats").isNumeric(),
            check("price","The price is invalid").trim().isNumeric(),
            check("images","Invalid URL").isURL(),




        ]





    }

}

export default Validator;