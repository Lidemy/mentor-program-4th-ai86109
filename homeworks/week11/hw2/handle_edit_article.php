<?php
  session_start();
  require_once('conn.php');

  if(
    empty($_POST['title']) ||
    empty($_POST['content'])
  ) {
    header('Location: edit_article.php');
    die();
  }

  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  $sql = "UPDATE ai86109_blog_articles SET title=?, content=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $title, $content, $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header('Location: admin.php');
?>