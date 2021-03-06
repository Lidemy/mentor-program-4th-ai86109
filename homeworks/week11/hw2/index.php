<?php
  session_start();
  require_once('conn.php');

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $limit_per_page = 5;
  $offset = $limit_per_page * ($page - 1);

  $sql = "SELECT * FROM ai86109_blog_articles WHERE is_deleted IS NULL ORDER BY created_at DESC LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $limit_per_page, $offset);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
?>
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="list.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="about.php">關於我</a></li>
        </div>
        <div>
          <?php if(!$username) { ?>
            <li><a href="login.php">登入</a></li>
          <?php } else { ?>
            <li><a href="admin.php">管理後台</a></li>
            <li><a href="logout.php">登出</a></li>
          <?php } ?>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="posts">
    <?php while($row = $result->fetch_assoc()) { ?>
      <article class="post">
        <div class="post__header">
          <div class="post__title"><?php echo $row['title'] ?></div>
          <div class="post__actions">
            <?php if($username) { ?>
              <a class="post__action" href="edit_article.php?id=<?php echo $row['id'] ?>">編輯</a>
            <?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo $row['created_at'] ?>
        </div>
        <div class="post__content-index ellipsis">
          <?php echo $row['content'] ?>
        </div>
        <a class="btn-read-more" href="article.php?id=<?php echo $row['id'] ?>">READ MORE</a>
      </article>
      <?php } ?>
    </div>
    <?php
      $sql = "SELECT count(id) AS count FROM ai86109_blog_articles WHERE is_deleted IS NULL";
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $limit_per_page);
    ?>
  </div>
  <div class="page-info">
    <?php echo $page ?> / <?php echo $total_page ?>
  </div>
  <div class="paginator">
    <?php if($page > 1) { ?>
      <a class="post__action" href="index.php?page=1">首頁</a>
      <a class="post__action" href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
    <?php } else if($page !== $total_page) { ?>
    <a class="post__action" href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
    <a class="post__action" href="index.php?page=<?php echo $total_page ?>">最後一頁</a>
    <?php } ?>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>