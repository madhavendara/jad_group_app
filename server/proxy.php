<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$api_url = 'https://sandbox.zohoapis.com/crm/v2/functions/Equipment_Listings/actions/execute?auth_type=apikey&zapikey=YOUR_ZOHO_API_KEY&keyword=&model=&page=1&limit=100';

$options = [
    'http' => [
        'method' => 'GET',
    ],
];

$context = stream_context_create($options);
$response = file_get_contents($api_url, false, $context);

if ($response === FALSE) {
    $error = ['error' => 'Error fetching data from Zoho API'];
    header('Content-Type: application/json');
    echo json_encode($error);
} else {
    // Check if the response is a valid JSON
    $decodedResponse = json_decode($response);

    if ($decodedResponse !== null) {
        // Response is a valid JSON
        header('Content-Type: application/json');
        echo $response;
    } else {
        // Response is not a valid JSON
        $error = ['error' => 'Invalid JSON response from Zoho API'];
        header('Content-Type: application/json');
        echo json_encode($error);
    }
}
?>