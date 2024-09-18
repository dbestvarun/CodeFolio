import React from 'react';
import '../style/LoginForm.css';

const LoginForm = () => {
  const spans = Array.from({ length: 10000 }, (_, index) => index);
  return (
    <section> 
       {spans.map((_, index) => (
              <span key={index}></span>
            ))}

   <div class="signin"> 

    <div class="content"> 

     <h2>Log In</h2> 

     <div class="form"> 

      <div class="inputBox"> 

       <input type="text" required /> <i>Username</i> 

      </div> 

      <div class="inputBox"> 

       <input type="password" required /> <i>Password</i> 

      </div> 

      <div class="links"> <a href="#">Forgot Password</a> <a href="#">Signup</a> 

      </div> 

      <div class="inputBox"> 

       <input type="submit" value="Login" /> 

      </div> 

     </div> 

    </div> 

   </div> 

  </section> 
  );
};

export default LoginForm;
