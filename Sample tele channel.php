<?php
require_once '../../common.php';

// $content = file_get_contents("php://input");
// if($content){
$apiToken = '1474716380:AAHlg8dHlcJtZJuAz8ZNCJxRCJUuai2bQ3w';
$msg = isset($_GET['tele']) ? $_GET['tele'] : "";
$goback = isset($_GET['goback']) ? $_GET['goback'] : "No";
$channel = isset($_GET['user']) ? $_GET['user'] : "@partyplannerzchannel";

if ($goback == 'signup') {
    $website = "https://api.telegram.org/bot" . $apiToken;
    // echo $website . "/getUpdates";
    $data = file_get_contents($website . "/getUpdates");
    print_r($data);

    $result = json_decode($data)->result;
    // echo "<pre>";
    // print_r($result);
    // echo "</pre>";
    if ($channel != "@partyplannerzchannel") {
        $isfound = false;
        foreach ($result as $key => $value) {
            // echo "<pre>";
            // print_r($value);
            // echo "</pre>";
            $startedusername = $value->message->from->username;
            $starteduserid = $value->message->from->id;
            // echo $starteduserid;
            // echo $startedusername;
            if (strtolower($startedusername)  == strtolower($channel)) {
                $channel =  $starteduserid;
                $isfound = true;
                $dao = new UserDAO();
                $status = $dao->UpdateUserByTelegram($startedusername, $starteduserid);
                // echo $status;
                break;
            }
        }
        if ($isfound == false) {
            $channel = "@partyplannerzchannel";
            $msglist = explode(' ',$msg);
            $msg .= 'Hi '.$msglist[1].'Please Activate your Party Plannerz Bot so that Party Plannerz can text u';
        }
    }
}

$data = [
    'chat_id' => $channel,
    'text' => $msg
];
if ($msg != "") {
    $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data));
}

if ($goback == 'signup') {
    header('Location: ../../loginpage.php?msg=1');
    exit;
} else if ($goback == 'eventhandle') {
    header('Location: ../../eventHandle.php?msg=1');
    exit;
} else if ($goback == 'deco') {
    header('Location: ../../decorationHandle.php?msg=1');
    exit;
} else if ($goback == 'playlist') {
    header('Location: ../../playlistHandle.php?msg=1');
    exit;
}







// header("location:javascript://history.go(-1)");

//     $apiLink = "https://api.telegram.org/bot$token/";

//     echo '<pre>content = '; print_r($content); echo '</pre>';
//     $update = json_decode($content, true);
//     if(!@$update["message"]) $val = $update['callback_query'];
//     else $val = $update;

//     $chat_id = $val['message']['chat']['id'];
//     $text = $val['message']['text'];
//     $update_id = $val['update_id'];
//     $sender = $val['message']['from'];
//     $msg = $_GET['tele'];

//     


    //     file_get_contents($apiLink . "sendmessage?chat_id=$chat_id&text=".$msg);
    //     echo 'Response sent.<br /><br />';
    // } else echo 'Only telegram can access this url.';