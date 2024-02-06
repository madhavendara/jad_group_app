<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$page = $_GET['page'];
$search = isset($_GET['search']) ? $_GET['search'] : '';
$search = urlencode($search);

$api_url = "https://sandbox.zohoapis.com/crm/v2/functions/Equipment_Listings/actions/execute?auth_type=apikey&zapikey=1003.1442c404d17b088400d28337ac8a5f72.dfd2209ce09cb9e32f8d4a01217626bd&keyword={$search}&model=&page={$page}&limit=10";

$options = [
    'http' => [
        'method' => 'GET',
    ],
];

$context = stream_context_create($options);
$response = file_get_contents($api_url, false, $context);

if ($response === FALSE) {
    
    $error = ['error' => $api_url];
    header('Content-Type: application/json');
    echo json_encode($error);
} else {
    $decodedResponse = json_decode($response, true);

    if ($decodedResponse !== null) {
        if (isset($decodedResponse['message']) && $decodedResponse['message'] === 'Data not Available') {
            // Handle the case when data is not available
            $dataNotAvailable = ['message' => 'Data not available'];
            header('Content-Type: application/json');
            echo json_encode($dataNotAvailable);
        } else {
            // Valid response with data
            header('Content-Type: application/json');
            echo $response;
        }
    } else {
        // Invalid JSON response
        $error = ['error' => 'Invalid JSON response from Zoho API'];
        header('Content-Type: application/json');
        echo json_encode($error);
    }
}
?>