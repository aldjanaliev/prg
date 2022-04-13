<?php 
 include 'bx24.php';
//$imail="oogle.assa@gmail.com"; //Email (можно через запятую - email1, email2, email3)
$imail="Myremontdirect@yandex.ru,quiz24-job@yandex.ru";
$ireply=""; //Email для ответа (нажимая на ''отправить'' клиент отправит сообщение на этот email)
$tiny_text="спасибо за вашу заявку, мы свяжемся с вами в ближайшее время."; //Благодарность
$ntimer=""; //Таймер возврата на главную, в секундах - после успешного заказа, по истичению заданного времени заказчика перекинет на главную страницу
$kod_kod=""; //Скрипты
?>
<!DOCTYPE HTML>
<html style="height: 100%; font-family: 'Lato', Calibri, Arial, sans-serif;">
<head>
  <meta http-equiv="content-type" content="text/html" />
  <meta name="author" content="smok003" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, user-scalable=false"/>
  <?=$ntimer > ' ' ? '<meta http-equiv="refresh" content="' . $ntimer . '; url=/">' : ''?>

  <?php
  if ( isset($_POST['Телефон']) ) {
  $message = '';
  $message_2 = '';
  $client = '';

  $phone = $_POST['Телефон'];
  $comment = $_POST["comment"];
  $utm_source = $_POST["utm_source"];
  $utm_medium = $_POST["utm_medium"];
  $utm_campaign = $_POST["utm_campaign"];
  $utm_content = $_POST["utm_content"];
  $utm_term = $_POST["utm_term"];


  

  $post = array(
    'имя'     => 'Имя: ',           'name'   => 'Имя: ',
    'tel'     => 'Телефон: ',       'phone'  => 'Телефон: ',       'contact'    => 'Контакты: ',
    'skype'   => 'Скайп: ',         'color'     => 'Цвет: ',       'vk'         => 'Вконтакте: ',
    'mail'    => 'Email: ',         'email'  => 'Email: ',

    /* стандартные доп поля */
    'notes'   => 'Комментарий: ',   'note'   => 'Комментарий: ',   'comment'    => 'Комментарий: ',
    'Тип жилья' => 'Тип жилья: ',
    'legal'   => 'Форма юридического лица компании: ',         'adress' => 'Адрес: ',         'address'    => 'Адрес: ',     'addr'  => 'Адрес: ',
    'segment'=> 'Сегмент бизнеса: ',
    'add'     => 'Дополнительно: ', 'dop'    => 'Дополнительно: ', 'additional' => 'Дополнительно: ',
    'activity'    => 'Сфера деятельности: ',          'messenger'   => 'Мессенджер: ',          'price'      => 'Стоимость: ', 'total_price' => 'Итого: ',
    'subject' => 'Тема: ',          'theme'  => 'Тема: ',
    'deals'   => 'Кто сейчас занимается решением юридических вопросов: ',
    'count'   => 'Количество: ',
    'message' => 'Сообщение: ',
    'own_variable_dop'     => 'В какой области требуется юридическое сопровождение (свой вариант): ',
    'own_variable_works' => 'Форма юридического лица компании (свой вариант): ',
    'own_variable_naznachenie' => 'Сфера деятельности (свой вариант): ',
    'own_variable_dops' => 'Кто сейчас занимается решением юридических вопросов (свой вариант): ',

    /* свойства обьектов */
    'where'      => 'Где нужно сделать ремонт: ',      'width'   => 'Ширина: ',       'height'     => 'Высота: ',    'length'  => 'Длинна: ',
    'own_variable_place'     => 'Где (свой вариант): ',        'format'  => 'Формат: ',
    'windows'      => 'Окна: ',         'kanalizaciya'    => 'Канализация: ',      
    'weight'    => 'Вес: ',         'color_own_variable'  => 'Цвет свой вариант: ',          'antresoli'         => 'Антресоли: ',
    'otdelka'    => 'Чаша и отделка: ',      'shape'   => 'Фигура: ',
    'square' => 'Площадь : ',   'pattern' => 'Структура: ',    'texture'    => 'Структура: ',
    'planirovka'    => 'Планировка: ',      'style' => 'Стиль: ',
    'dop'    => 'Дополнительные услуги: ',    'img'     => 'Картинка: ',
    'present'  => 'Подарок: ',     'ref'     => 'Реферал: ',
    'title'     => 'Заголовок (название): ',
    'type'      => 'Тип: ',
    'messenger'     => 'Мессенджер: ',
    'question'  => 'Вопрос: ',
    'time'      => 'Время звонка: '
  );

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

    foreach ($_POST as $key => $value) {
      if ( $value != "" ){
        if (is_array($value)) {
          $message .= ( $post[$key] ? $post[$key] : ($key . ': ') )  . PHP_EOL;
          $message .= frarr($value);
          $message .= PHP_EOL;
        } else
        $message .= ( $post[$key] ? $post[$key] : ($key . ': ') ) . $value . PHP_EOL;
      }
    }

    unset($_POST["tel"]);
  //unset($_POST["time"]);
    unset($_POST["email"]);

    foreach ($_POST as $key => $value) {
      if ( $value != "" && $key != "utm_content"  && $key != "utm_term"  && $key != "utm_source" && $key != "utm_medium" && $key != "utm_campaign" ){
        if (is_array($value)) {
          $message_2 .=  ( $post[$key] ? $post[$key] : ($key . ': ') )  . "<br>";
          $message_2 .= implode(" | ",$value);
          $message_2 .= "<br>";

        } else
        $message_2 .= ( $post[$key] ? $post[$key] : ($key . ': ') ) . $value . "<br>";
      }
    }

    $header = 'Content-type: text/plain; charset=UTF-8' . PHP_EOL . 
    'From: ' . ' info@myremont-pro.ru' . PHP_EOL . 
    'MIME-Version: 1.0'. PHP_EOL;

    $title = 'Заказ с сайта ' . $_SERVER['HTTP_HOST'];

    if (!$imail) { 
// сообщение не отправилось
      $thisfile = pathinfo($_SERVER['PHP_SELF']); ?>

      <title>Ошибка отправки</title>
    </head>
    <body>
      <div style="width:980px;max-width:100%;margin:0 auto;text-align:center;">
        <h1> Ошибка отправки! </h1> 
        <h2>Email не задан, некуда отправить заявку</h2>

        Вверху файла <strong><?= $thisfile['basename'] ?></strong> найдите строку <strong>$imail=""</strong> и впишите ваш email в кавычках<br/>
        пример: <strong>$imail="<b>email@mail.ru</b>"</strong>
        <br/>
        <br/>

        <h2>Содержимое текущей заявки:</h2>
        <div class="mail"><?= (preg_replace("/\n/i", "<br>", $message)) ?></div>
      </div>
      <style>
        html{background-color: #EAC5C5;} b{color:#f00;}
        .mail{display: inline-block; margin: 0 auto; text-align: left; border: 3px solid #fff9; padding: 10px 25px;}
        h2{margin-bottom: 10px;}
      </style>
    </body>
    </html>

    <?php die; }

    if (mail($imail, $title, $message, $header) == 1) {
    //mail("sergeykozin1@gmail.com", $title, $message, $header);
      $title = 'Заявка с сайта myremont-pro.ru';
     
      // echo "<pre>";
      // var_dump($message_2);
      // echo "</pre>";

      $params = '{
        "fields": {
          "TITLE":"' . $title . '",
          "NAME":"' . ' Новый клиент ' . '",
          "PHONE": [{
           "VALUE": "' . $phone . '",
           "VALUE_TYPE": "WORK"
           }],
           "COMMENTS": "' . $message_2 .'",
           "UTM_SOURCE": "' . $utm_source .'",
           "UTM_CONTENT": "'. $utm_content .'",
           "UTM_MEDIUM": "'. $utm_medium .'",
           "UTM_CAMPAIGN": "'. $utm_campaign .'",
           "UTM_TERM": "'. $utm_term .'"
         }
       }';
       bx24($params, 'crm.lead.add');

//Успешная заявка 
       ?> 

       <title>Спасибо за заявку!</title></head><body>
        <div class="outer-wrap" style="top: 40%;">
          <div class="container">
            <p id="info" ><?=$client . ' ' . $tiny_text;?></p>
          </div>
        </div>
        <style>
          html{background-image: linear-gradient(to top, #D1F0D1 0%, #fff 50%, #D1F0D1 100%); background-color: #D1F0D1;}
          #info::first-letter{text-transform: uppercase;}
        </style> 

      <?php } else {
// Ошибка отправки ф-цией mail() 
        ?>

        <title>Ошибка отправки!</title></head><body>
          <div class="outer-wrap">
            <div class="container">
              <p id="info">Ошибка отправки заказа!<br/><span>Если вы видите это сообщение при попытке оформить заказ - свяжитесь с нами, для уточнения статуса заказа.</span><br /><br /><a href=".">На главную</a></p>
            </div>
          </div>
          <style>
            html{background-image: linear-gradient(to top, #EAC5C5 0%, #FFF 50%, #EAC5C5 100%); background-color: #EAC5C5;}
          </style>

        <?php }

      } else {
// Не указан обязательный парамерт отправки (напр. телефон) 
        ?>

        <title>Ошибка оформления заказа!</title></head><body>
          <div class="outer-wrap">
            <div class="container">
              <p id="info">Ошибка оформления заказа!<br/><span>Скорее всего, вы просто открыли эту страницу в браузере, вернитесь на главную и попробуйте сделать заказ.</span><br /><br /><a href=".">На главную</a></p>
            </div>
          </div>
          <style>
            html{background-image: linear-gradient(to top, #F0E7E7 0%, #FFF 50%, #F0E7E7 100%); background-color: #FFE4E4;}
          </style>
        <?php } ?>
        <!-- метрика, аналитика -->
        <?=$kod_kod?>

        <style>
          #info {font-size: 1em; vertical-align: middle;}
          #info span {color: gray; font-size:0.8em;}
          .container{width: 95%;}
          body{margin: 0;}
          .container{margin: 0px auto; text-align: center; display: block; bottom: 0%; left: 0%;}
          .outer-wrap{top: 40%; position: absolute; width:100%;}
          @media (min-width: 1920px){body{font-size:24px;}}
          @media (max-width: 1920px){body{font-size:22px;}}
          @media (max-width: 1366px){body{font-size:20px;}}
          @media (max-width: 1024px){body{font-size:18px;}}
        </style>



      </body>
      </html>