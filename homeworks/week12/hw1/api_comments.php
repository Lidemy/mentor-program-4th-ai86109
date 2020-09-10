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

  $limit = 5;
  $id = $_GET['id'];
  if($id == 0) {
    $sql = "SELECT MAX(id) AS id FROM ai86109_w12_discussion";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $id = $row['id'] + 1;
  }

  $site_key = $_GET['site_key'];
  $sql = "SELECT id, nickname, content, created_at FROM ai86109_w12_discussion WHERE site_key=? AND id<? ORDER BY id DESC LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sii', $site_key, $id, $limit);
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
  $discussion = array();
  while ($row = $result->fetch_assoc()) {
    array_push($discussion, array(
      "id" => $row['id'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
      "created_at" => $row['created_at']
    ));
  }

  $json = array(
    "ok" => true,
    "discussion" => $discussion
  );
  $response = json_encode($json);
  echo $response;
?>