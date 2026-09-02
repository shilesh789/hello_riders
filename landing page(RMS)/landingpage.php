<?php

require_once "database.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Hello Riders - Login</title>

    <link rel="stylesheet" href="style.css">

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

</head>

<body>

    <div class="login-page">

        <!-- Dark overlay -->
        <div class="overlay"></div>


        <!-- ================= LEFT SECTION ================= -->

        <div class="left-section">

            <!-- Logo -->
            <div class="logo">
                <img src="logo.png" alt="Hello Riders Logo">
            </div>


            <!-- Welcome Text -->
            <div class="welcome-content">

                <h1>
                    Welcome<br>
                    Back
                </h1>

                <p>
                    Login to continue your journey<br>
                    and explore new adventures with Hello Riders.
                </p>

            </div>


            <!-- Safety Message -->
            <div class="safety-message">

                <img src="secure.png" alt="Safe and Secure">

                <div>
                    <p>Ride Together. Stay Connected.</p>
                    <p>Stay Safe With Hello Riders</p>
                </div>

            </div>

        </div>



        <!-- ================= RIGHT SECTION ================= -->

        <div class="right-section">
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">

            <div class="login-container">

                <h2>Log in</h2>

                <p class="login-subtitle">
                    Welcome back! Please enter your details.
                </p>


                <!-- Email -->

                <div class="form-group">

                    <label>Email or Phone</label>

                    <div class="input-box">

                        <i class="fa-regular fa-envelope"></i>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            name="email"
                        > 

                    </div>

                </div>


                <!-- Password -->

                <div class="form-group">

                    <label>Password</label>

                    <div class="input-box">

                        <i class="fa-solid fa-lock"></i>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                        >

                        <i class="fa-regular fa-eye password-eye"></i>

                    </div>

                </div>


                <!-- Remember / Forgot -->

                <div class="login-options">

                    <label>

                        <input type="checkbox" name="remember me">

                        <span>Remember Me</span>

                    </label>

                    <a href="#">
                        Forgot Password?
                    </a>

                </div>


                <!-- Sign In Button -->

                <button class="login-button" name="login_button">
                    Log in
                </button>


                <!-- Divider -->

                <div class="divider">

                    <span></span>

                    <p>or sign in with</p>

                    <span></span>

                </div>


                <!-- Sign Up -->

                <p class="signup-text">

                    Don't have an account?

                    <a href="register.html">
                        Sign Up
                    </a>

                </p>

              </div>
            </form>
        </div>

    </div>

</body>

</html>

<?php
if(isset($_POST['login_button'])){
$email=$_POST['email']??"";
$password=$_POST['password']??"";
$result= mysqli_query($conn, "SELECT * FROM userLoginInfo WHERE email='$email'");

$row=$result->fetch_assoc();
    
if($email==$row["email"] && $password==$row["password"]){
    echo "logged in succcessfully";
}else{
    echo "Incorrect credential";
}
}
?>