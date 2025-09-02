import React, {useState} from 'react';

const SignUp = () => {

    const[fields, setFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: 0,
        gender: '',
        location: 'Select your location',
        terms: false
    });

    const[fieldsErrors, setFieldsErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        location: '',
        terms: ''
    });


    const handleChange = (e) => {
        // const { name, value, type, checked } = e.target;
        // setFields((prevFields) => ({
        //     ...prevFields,
        //     [name]: type === 'checkbox' ? checked : value
        // }));

        setFieldsErrors({...fieldsErrors, [e.target.name]: ''});

        const tar = e.target;

        if(tar.type === "checkbox") {
            setFields({...fields, [tar.name]: tar.checked})
        } else {
            setFields({...fields, [tar.name]: tar.value})
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fields);

        // validations for fields and check for errors
        let errors = {};

        const regexName = /^[A-Za-z]+$/;
        const regexEmail = /^(?:[a-zA-Z0-9_'^&+/=!?${}~*-]+(?:\.[a-zA-Z0-9_'^&+/=!?${}~*-]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

        if (fields.firstName.length < 2 || !regexName.test(fields.firstName) ) {
            errors.firstName = 'First name must be at least 2 characters long and contain only letters.';
        }
        if (fields.lastName.length < 2 || !regexName.test(fields.lastName) ) {
            errors.lastName = 'Last name must be at least 2 characters long and contain only letters.';
        }
        if (fields.email.length < 5 || !regexEmail.test(fields.email) ) {
            errors.email = 'Email must be at least 5 characters long and be a valid email address.';
        }
        if (fields.password.length < 8 || !regexPassword.test(fields.password)) {
            errors.password = 'Password must be at least 8 characters long and contain at least one letter and one number and one special character.';
        }
        if (fields.confirmPassword !== fields.password || fields.confirmPassword === '') {
            errors.confirmPassword = 'Passwords do not match.';
        }
        if (fields.age < 0 || fields.age == '0' || fields.age > 110) {
            errors.age = 'Please enter a valid age between 1 and 110.';
        }
        if (fields.gender === '') {
            errors.gender = 'Please select your gender.';
        }
        if (fields.location === 'Select your location' || fields.location === '') {
            errors.location = 'Please select your location.';
        }
        if (!fields.terms) {
            errors.terms = 'You must accept the terms and conditions.';
        }

        setFieldsErrors({...fieldsErrors, ...errors});
        console.log(errors, fieldsErrors);

        if (fieldsErrors.firstName || fieldsErrors.lastName || fieldsErrors.email || fieldsErrors.password || fieldsErrors.confirmPassword || fieldsErrors.age || fieldsErrors.gender || fieldsErrors.location || fieldsErrors.terms) {
            // If there are errors, prevent form submission
            e.preventDefault();
        }
    };

  return (
    <div className='SignUp'>
        
        <h1> Sign Up! </h1>
        <h3> Create your account </h3>
        <h4 style={{ color: 'black' }}> Already a member? <span><a href="#" style={{ color: '#c078c4', textDecoration: 'none' }}>Login</a></span> </h4>
        <hr style={{ border: '1px solid purple', width: '500px' , marginLeft: 0}} />

        <p> First Name: 
            <input 
                type="text" 
                placeholder="first name" 
                name="firstName"
                value={fields.firstName}
                onChange={handleChange}
            />
            {fieldsErrors.firstName && <p className='error'>{fieldsErrors.firstName}</p>}
        </p>

        <p> Last Name:
            <input
                type="text"
                placeholder="last name"
                name='lastName'
                value={fields.lastName}
                onChange={handleChange}
            />
             {fieldsErrors.lastName && <p className='error'>{fieldsErrors.lastName}</p>}
        </p>

        <p> Email: 
            <input
                type="text"
                placeholder="email"
                name='email'
                value={fields.email}
                onChange={handleChange}
            />
            {fieldsErrors.email && <p className='error'>{fieldsErrors.email}</p>}
        </p>

        <p> Password: 
            <input
                type="text"
                placeholder="password"
                name='password'
                value={fields.password}
                onChange={handleChange}
            />
            {fieldsErrors.password && <p className='error'>{fieldsErrors.password}</p>}
        </p>
    
         <p> Confirm Password: 
            <input
                type="text"
                placeholder="confirm password"
                name='confirmPassword'
                value={fields.confirmPassword}
                onChange={handleChange}
            />
            {fieldsErrors.confirmPassword && <p className='error'>{fieldsErrors.confirmPassword}</p>}
        </p>

        <p> Age:
            <input
                type="text"
                placeholder="age"
                name='age'
                value={fields.age}
                onChange={handleChange}
            />
            {fieldsErrors.age && <p className='error'>{fieldsErrors.age}</p>}
        </p>

        <p className='radio'> Gender:
            <label>
            <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
            /> Male
            </label>
            <label>
            <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
            /> Female
            </label>
            <label>
            <input
                type="radio"
                name="gender"
                value="Prefer not to say"
                onChange={handleChange}
            /> Prefer not to say
            </label>
            {fieldsErrors.gender && <p className='error'>{fieldsErrors.gender}</p>}
        </p>

        <p> Location:
            <select
                name="location"
                value={fields.location}
                onChange={handleChange}
            >
                <option value="Select your location" disabled> Select your location</option>
                <option value="New York"> New York</option>
                <option value="Los Angeles"> Los Angeles</option>
                <option value="Chicago"> Chicago</option>
            </select>
            {fieldsErrors.location && <p className='error'>{fieldsErrors.location}</p>}
        </p>

        <label className='checkbox'>
            <input
                type="checkbox"
                name="terms"
                checked={fields.terms}
                onChange={handleChange}
            /> 
            I agree to the Terms and Conditions
            {fieldsErrors.terms && <p className='error'>{fieldsErrors.terms}</p>}
        </label>


        <p>
        <button
            type="submit"
            onClick={handleSubmit}
        >
            Sign Up 
        </button>
        </p>
    </div>
  )
}

export default SignUp