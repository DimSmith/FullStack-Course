<?php
//while loop
$i = 0;
while ($i <= 10) {
    echo $i . PHP_EOL;
    $i++;
}
echo "<br>";

//do while loop
$i = 100;
do {
    echo $i . PHP_EOL;
    $i--;
} while ($i >= 0);
echo "<br>";

//for loop
for ($i = 0; $i <= 10; $i++) {
    echo $i . PHP_EOL;
}
echo "<br>";

//ex: Multiplication table
echo "<br>";
echo "Multiplication table";
for ($i = 1; $i <= 10; $i++) {
    echo "<br>";
    for ($j = 1; $j <= 10; $j++) {
        echo str_pad($i * $j, 4, ' ', STR_PAD_LEFT);
        
    }
}




?>