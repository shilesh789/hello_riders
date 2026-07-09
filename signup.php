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
    <form id="myForm" action="signup.php" method="post">
    <label>Username</label><br>
    <input type="text" name="username" required><br>
    <label>Email</label><br>
    <input type="email" name="email" required><br>
    <label>Password</label><br>
    <input type="password" name="password" minlength="8" required><br>
    <label>Age</label><br>
    <input type="number" name="age" min="18" max="120"><br>
    <label>Phone number</label><br>
    <input type="tel" name="phone" pattern="[0-9]{10}"><br>
    <button type="submit">Sign Up</button>
    </div>
</form>
    
</body>
</html>