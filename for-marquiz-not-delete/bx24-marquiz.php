<?php 
// header('Access-Control-Allow-Origin: *'); 
?>
<?
header('Content-type: text/plain; charset=utf-8');
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
$data = json_decode(file_get_contents('php://input'), true);
echo '$data = '. $data ;

$answers = $data['answers'];
$phone = $data['contacts']['phone'];
$email = $data['contacts']['email'];
$name = $data['contacts']['name'];
$createdDate = strtotime($data['created']);
$utm = $data['extra']['utm'];
$rawAnswers = $data['raw'];
$title = "Ответ с квиза";
$contactID = 0;
$message_2 = '';
function frarr($arr){
	global $post;

	$r = '';
	foreach ($arr as $k => $v) {
		if (is_array($v))
			$r .= frarr($v);
		else
			$r .= ( $post[$k] ? $post[$k] : ($k . ': ') ) . $v . PHP_EOL;
	}

	return $r;
}
function frarr2($arr){
	global $post;

	$r = '';
	foreach ($arr as $k => $v) {
		if (is_array($v))
			$r .= frarr2($v);
		else
			$r .= ( $post[$k] ? $post[$k] : ($k . ': ') ) . $v . "<br>";
	}

	return $r;
}
foreach ($answers as $key => $value) {
	if($value != ''){
		if (is_array($value)) {
			$message_2 .= ( $post[$key] ? $post[$key] : ($key . ': ') )  . PHP_EOL;
			$message_2 .= frarr($value);
			$message_2 .= PHP_EOL;
		} else
		$message_2 .= ( $post[$key] ? $post[$key] : ($key . ': ') ) . $value . PHP_EOL;
	}
}
foreach ($answers as $key => $value) {
	if($value != ''){
		if (is_array($value)) {
			$message .= ( $post[$key] ? $post[$key] : ($key . ': ') )  . "<br>";
			$message .= frarr2($value). "<br>";
			$message .= "<br>";
		} else
		$message .= ( $post[$key] ? $post[$key] : ($key . ': ') )  . $value . '<br>';
	}
}
$get_contact_list = "https://remont-s-lidami.bitrix24.ru/rest/8/ijdkvptooffuvugd/crm.contact.list";

        // проверяем, или есть такой же
$deal_contact = http_build_query(array(
	'filter' => array("LOGIC" => "OR", "PHONE" => array($phone)),
	'select' => array("ID", "NAME", "LAST_NAME")
));

$curl_contact = curl_init();
curl_setopt_array($curl_contact, array(
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_POST => 1,
	CURLOPT_HEADER => 0,
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_URL => $get_contact_list,
	CURLOPT_POSTFIELDS => $deal_contact,
));

$res_contact = curl_exec($curl_contact);
curl_close($curl_contact);
$res_contact = json_decode($res_contact, 1);

$contacID = isset($result['result'][0]['ID']) ? $result['result'][0]['ID'] : 0;

echo '$contacID = ' .$contacID;

        // если нет такого, добавляем новый           
if(!$contacID){

	$srm_contact_url = "https://remont-s-lidami.bitrix24.ru/rest/8/ijdkvptooffuvugd/crm.contact.add";

	$srm_contact_add = http_build_query(array(
		'fields' => array(
			"NAME" => "Уточнить имя!",
			"OPENED" => "Y",
			"PHONE" => array(
				array("VALUE" => $phone, "VALUE_TYPE" => "WORK")
			),
			"COMMENTS" => $message_2
		),
		'params' => array("REGISTER_SONET_EVENT" => "Y")
	));

	$curl_contact_add = curl_init();
	curl_setopt_array($curl_contact_add, array(
		CURLOPT_SSL_VERIFYPEER => 0,
		CURLOPT_POST => 1,
		CURLOPT_HEADER => 0,
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_URL => $srm_contact_url,
		CURLOPT_POSTFIELDS => $srm_contact_add,
	));
	$new_contact = curl_exec($curl_contact_add);
	curl_close($curl_contact_add);

	$new_contact = json_decode($new_contact, 1);

	$contacID = isset($new_contact['result']) ? $new_contact['result'] : 0;
	echo '$contacID = ' . $contacID;
}
$queryUrl = "https://remont-s-lidami.bitrix24.ru/rest/8/ijdkvptooffuvugd/crm.deal.add";

$dealData = http_build_query(array(
	'fields' => array(
		"TITLE"     => "Заявка с квиза мой-ремонт24.рф",             
		"CONTACT_ID"=> $contacID,
		"TYPE_ID"   => "SALE",
		"CATEGORY_ID" => 22,
		"OPENED"    =>"Y", 
		"COMMENTS"  => $message,
		"ASSIGNED_BY_ID"=> 8,
	)
));

  // обращаемся к Битрикс24 при помощи функции curl_exec
$curl = curl_init();
curl_setopt_array($curl, array(
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_POST => 1,
	CURLOPT_HEADER => 0,
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_URL => $queryUrl,
	CURLOPT_POSTFIELDS => $dealData,
));
$result = curl_exec($curl);
curl_close($curl);
$result = json_decode($result, 1);

$leadID = isset($result['result']) ? $result['result'] : 0;
echo '$leadID = ' . $leadID;
        // добавляем сообщение к сделке
$URL = "https://remont-s-lidami.bitrix24.ru/rest/8/ijdkvptooffuvugd/crm.timeline.comment.add";

$dealData2 = http_build_query(array(
	'fields' => array(
		"ENTITY_ID" => $leadID,
		"ENTITY_TYPE" => "deal",
		"COMMENT" => $message_2
	)
));

$curl2 = curl_init();
curl_setopt_array($curl2, array(
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_POST => 1,
	CURLOPT_HEADER => 0,
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_URL => $URL,
	CURLOPT_POSTFIELDS => $dealData2,
));
$result2 = curl_exec($curl2);
curl_close($curl2);

$result2 = json_decode($result2, 1);

//   http_response_code(200);
// exit;