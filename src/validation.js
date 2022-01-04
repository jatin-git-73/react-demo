function validatePersonalDetails(cur_emp){
    let errors={
        is_failed:false
    }
    if(cur_emp.first_name==undefined){
        errors.first_name="Please enter first name";
        errors.is_failed=true;
    }else if(cur_tmp.first_name.length<5){
        errors.first_name="First name must be 5 characters long";
        errors.is_failed=true;
    }
    if(cur_emp.last_name==undefined){
        errors.last_name="Please enter last name";
        errors.is_failed=true;
    }else{
        errors.last_name="Last name must be 5 characters long";
        errors.is_failed=true;
    }


    return errors;
}

export default function validate(cur_emp={},step=0){
    let errors={
        failed:false
    };
    return errors;
}