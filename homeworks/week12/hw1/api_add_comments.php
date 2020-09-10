<?php
  require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  if(
    empty($_POST['nickname']) ||
    empty($_POST['content']) ||
    empty($_POST['site_key'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_POST['site_key'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];
  $sql = "INSERT INTO ai86109_w12_discussion(site_key, nickname, content) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $site_key, $nickname, $content);
  $result = $stmt->execute();
  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $json = array(
    "ok" => true,
    "message" => "success"
  );
  $response = json_encode($json);
  echo $response;
?>