<?php
  session_start();
  require_once('conn.php');

  if(
    empty($_GET['id'])
  ) {
    header('Location: admin.php');
    die();
  }

  $id = $_GET['id'];

  $sql = "UPDATE ai86109_blog_articles SET is_deleted=1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header('Location: admin.php');
?>