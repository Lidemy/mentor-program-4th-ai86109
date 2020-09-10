<?php
  require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  if(
    empty($_GET['site_key'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please add site_key in url"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = $_GET['id'];
  $site_key = $_GET['site_key'];
  
  $sql = "SELECT MIN(id) AS id FROM ai86109_w12_discussion WHERE site_key=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $site_key);
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
  $row = $result->fetch_assoc();
  if($id == $row['id']) {
    $json = array(
      "ok" => true,
      "hide" => true
    );
    $response = json_encode($json);
    echo $response;
    die(); 
  }

  $sql = "SELECT count(id) AS count FROM ai86109_w12_discussion WHERE site_key=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $site_key);
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
  $row = $result->fetch_assoc();
  if($row['count'] <= 5) {
    $json = array(
      "ok" => true,
      "hide" => true
    );
    $response = json_encode($json);
    echo $response;
    die(); 
  }

  $json = array(
    "ok" => true,
    "hide" => false
  );
  $response = json_encode($json);
  echo $response;
?>