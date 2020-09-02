<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(empty($_GET['id'])) {
    header('Location: admin.php?errCode=1');
    die();
  }

  $id = $_GET['id'];
  $role = $_GET['role'];

  $sql = "UPDATE ai86109_users SET role=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $role, $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
  header('Location: admin.php');
?>