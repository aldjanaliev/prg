<?php
header('Content-type: text/plain; charset=utf-8');
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
include 'bx24.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';

// можно несколько адресов, через запятую
//$admin_email  = [ "Myremontdirect@yandex.ru", "quiz24-job@yandex.ru", "oogle.assa@gmail.com"];
$admin_email  = [ "oogle.assa@gmail.com"];
$form_subject = trim($_POST["Тема"]);

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

$utm_source = $_POST["utm_source"];
$utm_medium = $_POST["utm_medium"];
$utm_campaign = $_POST["utm_campaign"];
$utm_content = $_POST["utm_content"];
$utm_term = $_POST["utm_term"];

$c = true;
$message = '';
$message_2 = '';
$message_crm = '';
foreach ( $_POST as $key => $value ) {
	if ( $value != ""  && $key != "admin_email" && $key != "form_subject" ) {
		if (is_array($value)) {
			$val_text = '';
			foreach ($value as $val) {
				if ($val && $val != '') {
					$val_text .= ($val_text==''?'':', ').$val;
				}
			}
			$value = $val_text;
		}
$message_crm .= "{$key}: {$value} \n";
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
		<td style='padding: 10px; width: auto;'><b>$key:</b></td>
		<td style='padding: 10px;width: 100%;'>$value</td>
		</tr>
		";

	}
}

$message = "<table style='width: 50%;'>$message</table>";


$phone = $_POST['Телефон'];

// От кого
$mail->setFrom('info@' . $_SERVER['HTTP_HOST'], 'Мой Ремонт ');

// Кому
foreach ( $admin_email as $key => $value ) {
	$mail->addAddress($value);
}
// Тема письма
$mail->Subject = $form_subject;

// Тело письма
$body = $message;
// $mail->isHTML(true);  это если прям верстка
$mail->msgHTML($body);

$mail->send();

$phone = $_POST["Телефон"];
$title = 'Заказ с сайта myremont-pro.ru' ;


$params = '{
"fields": {
  "TITLE":"' . $title . '",
  "NAME":"' . ' Новый клиент ' . '",
  "PHONE": [{
   "VALUE": "' . $phone . '",
   "VALUE_TYPE": "WORK"
   }],
   "COMMENTS": "' . $message_crm .'",
   "UTM_SOURCE": "' . $utm_source .'",
   "UTM_CONTENT": "'. $utm_content .'",
   "UTM_MEDIUM": "'. $utm_medium .'",
   "UTM_CAMPAIGN": "'. $utm_campaign .'",
   "UTM_TERM": "'. $utm_term .'"
 }
}';
bx24($params, 'crm.lead.add');


return true;

?>