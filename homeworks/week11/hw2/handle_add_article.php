<?php
  session_start();
  require_once('conn.php');

  if(
    empty($_POST['title']) ||
    empty($_POST['content'])
  ) {
    header('Location: add_article.php');
    die();
  }

  $title = $_POST['title'];
  $content = $_POST['content'];

  $sql = "INSERT INTO ai86109_blog_articles(title, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $title, $content);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header('Location: admin.php');
?>