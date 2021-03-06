<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(empty($_POST['content'])) {
    header('Location: update_comment.php?errCode=1&id='.$_POST['id']);
    die();
  }

  $id = $_POST['id'];
  $content = $_POST['content'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  
  if ($user['role'] == 2) {
    $sql = "UPDATE ai86109_comments SET content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
  } else {
    $sql = "UPDATE ai86109_comments SET content=? WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
  }
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>