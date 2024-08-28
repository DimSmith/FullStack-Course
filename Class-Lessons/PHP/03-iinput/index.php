<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = trim($_POST["name"]);
        $age = (int)trim($_POST["age"]);
        $year = 2024 - $age;
        echo "Hello $name, you were born in $year";
    } else {
    ?>
        <form method="POST">
            <label for="name">Enter your name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="age">Enter your age:</label>
            <input type="number" id="age" name="age" required><br><br>
            <input type="submit" value="Submit">
        </form>
    <?php
    }
?>