import React, { useState } from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import { CustomButtonContainer } from '../custom-button/custom-button.styles';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user-actions';

const SignIn = ({ googleSignIn, emailSignInStart}) => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { email, password } = userCredentials;
    
    const handleSubmit = (event) => {
        event.preventDefault();

        emailSignInStart(email, password);
    }

    const handleChange = (event) => {
        const { value, name} = event.target;

        setCredentials({...userCredentials, [name]: value });
    }
 
    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email" 
                    type="email" 
                    value={email} 
                    required 
                    handleChange={handleChange}
                    label="email"
                />
                <FormInput
                    name="password" 
                    type="password" 
                    value={password} 
                    required 
                    handleChange={handleChange}
                    label="password"
                />
                <div className='buttons'>
                    <CustomButtonContainer type="submit">Sign in</CustomButtonContainer>
                    <CustomButtonContainer type="button" onClick={() => googleSignIn()} isGoogleSignIn>
                        Sign in with Google
                    </CustomButtonContainer>
                </div>

            </form>
        </div>    
    )
}

const mapDispatchToProps = dispatch => ({
  googleSignIn: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);