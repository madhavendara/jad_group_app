<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


$jadId = isset($_GET['jadId']) ? $_GET['jadId'] : '';
$fullName = isset($_GET['fullName']) ? $_GET['fullName'] : '';
$companyName = isset($_GET['companyName']) ? $_GET['companyName'] : '';
$email = isset($_GET['email']) ? $_GET['email'] : '';
$phoneNumber = isset($_GET['phoneNumber']) ? $_GET['phoneNumber'] : '';


$apiUrl = 'https://sandbox.zohoapis.com/crm/v2/functions/Equipment_test/actions/execute?auth_type=apikey&zapikey=1003.1442c404d17b088400d28337ac8a5f72.dfd2209ce09cb9e32f8d4a01217626bd';


$data = [
    'JAD ID' => $jadId,
    'Full Name' => $fullName,
    'Company Name' => $companyName,
    'Email' => $email,
    'Phone Number' => $phoneNumber,
];


$jsonData = json_encode($data);


$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: text/plain',
    'Cookie: 0afdefadc8=00ad0429837d682dadcd1fa2d808aa64',
]);


$response = curl_exec($ch);


if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
}


curl_close($ch);


header('Content-Type: application/json');
echo $response;



?>