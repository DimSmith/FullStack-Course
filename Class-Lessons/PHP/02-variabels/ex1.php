<?php

$vat=1.17;

$fruit1="apple";
$fruit2="orange";
$fruit3="banana";
$fruit4="mango";
$fruit5="grape";

$fruit1_price=10;
$fruit2_price=15;
$fruit3_price=20;
$fruit4_price=25;
$fruit5_price=30;

echo "$fruit1 the price is $fruit1_price and price with vat is ".$fruit1_price*$vat . "\n";
echo "$fruit2 the price is $fruit2_price and price with vat is ".$fruit2_price*$vat . "\n";
echo "$fruit3 the price is $fruit3_price and price with vat is ".$fruit3_price*$vat . "\n";
echo "$fruit4 the price is $fruit4_price and price with vat is ".$fruit4_price*$vat . "\n";
echo "$fruit5 the price is $fruit5_price and price with vat is ".$fruit5_price*$vat . "\n";

$new_vat=1.19;

echo "$fruit1 the price is $fruit1_price and price with vat is ".$fruit1_price*$new_vat . "\n";
echo "$fruit2 the price is $fruit2_price and price with vat is ".$fruit2_price*$new_vat . "\n";
echo "$fruit3 the price is $fruit3_price and price with vat is ".$fruit3_price*$new_vat . "\n";
echo "$fruit4 the price is $fruit4_price and price with vat is ".$fruit4_price*$new_vat . "\n";
echo "$fruit5 the price is $fruit5_price and price with vat is ".$fruit5_price*$new_vat . "\n";



?>