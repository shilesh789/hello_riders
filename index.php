
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel ="stylesheet" href="styles.css"></link>
    <title>Document</title>
</head>
<body>
    <div class="myform">
    <form id="myForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
    <label>Username:</label>
    <input type="text" name="name" required><br>
    <label>Email:</label>
    <input type="email" name="email" required><br>
    <label>Password:</label>
    <input type="password" name="password" minlength="8" required><br>
    <button type="submit">Login</button>
    
<div>
    <h3>Did not signup yet</h3>
    <button id="signup"onclick="window.open('signup.php')">Signup</button>
</div>

</form>
<script src="script.js"></script>
</body>
</html>

 <?php 

if (isset($_POST["name"]) && isset($_POST["password"])) {

    $name=$_POST["name"]??null;
    $email=$_POST["email"]??null;
    $password=$_POST["password"]??null;

 
            
        $name=filter_var($name,FILTER_SANITIZE_SPECIAL_CHARS);
        $email=filter_var($email,FILTER_SANITIZE_EMAIL);
        echo("$name"."$email");
        }

?>

