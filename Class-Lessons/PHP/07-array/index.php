<?php
    header("Content-Type: txt/plain");
    $arr1 = array(1,2,3,4,5);
    
    //#1 way simple for
    for ($i = 0; $i < count($arr1); $i++) {
        echo $arr1[$i];
        echo "<br>";
    }

    //last and first item
    $lastItem = end($arr1)-1;
    echo "first item: " . $arr1[0];
    echo "<br>";
    echo "last item: " . $arr1[$lastItem];
    echo "<br>";

    //#2 create array
    $arr2=[10,20,30,40,50];

    //#3 - insert data
    for ($i=0; $i < 10; $i++) { 
        $arr3[$i]=$i+1;
    }

    //#4 - insert data to last place,like push in js
    for ($i=0; $i < 10; $i++) { 
        $arr3[]=$i+1;
    }


    //matrix
    //to insert a value in row 2, col 2
    $arr4[1][1]=100;

    //ex: Matrix - Multiplication table
    for ($i = 1; $i <= 10; $i++) {
        for ($j = 1; $j <= 10; $j++) {
            $arr5[$i][$j]=$i*$j;
        }
    }


?>