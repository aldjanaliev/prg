<?php

function bx24($params, $type) {

	$portal = 'myremontnow';

	$admin_id = '498';

	$secret_code = '4co6xopj338l57ey';

	$queryUrl = 'https://' . $portal . '.bitrix24.ru/rest/'.$admin_id.'/' . $secret_code . '/' . $type;

	//exit($queryUrl);



	$params = json_decode($params, true);

	#exit(print_r($params).'');

	//exit(print_r($params).'');

	$array_fields = json_decode($fields, true, 5);
	$queryData    = http_build_query(

	    $params
	);

	$curl = curl_init();
	curl_setopt_array($curl, array(
	    CURLOPT_SSL_VERIFYPEER => 0,
	    CURLOPT_POST           => 1,
	    CURLOPT_HEADER         => 0,
	    CURLOPT_RETURNTRANSFER => 1,
	    CURLOPT_URL            => $queryUrl,
	    CURLOPT_POSTFIELDS     => $queryData,
	));

	$result = curl_exec($curl);
	curl_close($curl);

	return json_decode($result, 1);
}

?>