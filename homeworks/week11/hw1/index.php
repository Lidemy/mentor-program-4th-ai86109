<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $user = array('role'=>1);
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $limit_per_page = 3;
  $offset = $limit_per_page * ($page - 1);

  $stmt = $conn->prepare(
    "SELECT " . 
    "C.id AS id, C.username AS username, " .
    "C.content AS content, C.created_at AS created_at, U.nickname AS nickname " .
    "FROM ai86109_comments AS C " .
    "LEFT JOIN ai86109_users AS U ON C.username = U.username " .
    "WHERE C.is_deleted IS NULL " .
    "ORDER BY C.id DESC " .
    "LIMIT ? OFFSET ?"
    );
  $stmt->bind_param('ii', $limit_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }

  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<header class="warning">
  <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
</header>
<main class="board">
  <div>
    <?php if(!$username) { ?>
      <a class="board__btn" href="register.php">註冊</a>
      <a class="board__btn" href="login.php">登入</a>
    <?php } else if($user['role'] == 2) { ?>
      <a class="board__btn" href="logout.php">登出</a>
      <a class="board__btn" href="admin.php">管理後台</a>
      <span class="board__btn update-nickname">編輯暱稱</span>
        <form class="hide board__nickname-form board__new-comment-form" method="POST" action="update_user.php">
          <div class="board__nickname">
            <span>新的暱稱：</span>
            <input type="text" name="nickname" />
          </div>
          <input class="board__submit-btn" type="submit" />
        </form>
      <h3>你好！<?php echo $user['nickname']; ?></h3>
    <?php } else { ?>
      <a class="board__btn" href="logout.php">登出</a>
      <span class="board__btn update-nickname">編輯暱稱</span>
        <form class="hide board__nickname-form board__new-comment-form" method="POST" action="update_user.php">
          <div class="board__nickname">
            <span>新的暱稱：</span>
            <input type="text" name="nickname" />
          </div>
          <input class="board__submit-btn" type="submit" />
        </form>
      <h3>你好！<?php echo $user['nickname']; ?></h3>
    <?php } ?>
  </div>
  <h1 class="board__title">Comment</h1>
  <?php
    if(!empty($_GET['errCode'])) {
      $error = $_GET['errCode'];
      $msg = 'Error';
      if($error = '1') {
        $msg = '資料不齊全';
      }
      echo '<h2 class="error">錯誤：' . $msg . '</h2>';
    }
  ?>
  <form class="board__form" method="POST" action="handle_add_comment.php">
    <?php if($username && $user['role'] > 0) { ?>
      <textarea name="content" rows="5"></textarea>
      <input class="board__submit-btn" type="submit" />
    <?php } else if($user['role'] == 0) { ?>
      <h3>您目前停權，發文限制中</h3>
    <?php } else { ?>
      <h3>請登入以發布留言</h3>
    <?php } ?>
    <div class="board__hr"></div>
  </form>
  <section>
    <?php
      while($row = $result->fetch_assoc()) {
    ?>
    <div class="card">
      <div class="card__avatar"></div>
      <div class="card__body">
        <div class="card__info">
          <span class="card__author">
            <?php echo escape($row['nickname'])?>
            (@<?php echo escape($row['username'])?>)
          </span>
          <span class="card__time"><?php echo escape($row['created_at'])?></span>
          <?php if(hasAuthority($row, $username, $user)) { ?>
            <a href="update_comment.php?id=<?php echo $row['id'] ?>">編輯</a>
            <a href="delete_comment.php?id=<?php echo $row['id'] ?>">刪除</a>
          <?php } ?>
        </div>
        <p class="card__content"><?php echo escape($row['content'])?></p>
      </div>
    </div>
    <?php } ?>
  </section>
  <div class="board__hr"></div>
  <?php
    $stmt = $conn->prepare("SELECT count(id) AS count FROM ai86109_comments WHERE is_deleted IS NULL");
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    $total_page = ceil($count / $limit_per_page);
  ?>
  <div class="page-info">
    <span>總共有<?php echo $count ?>筆筆留言，頁數：</span>
    <span><?php echo $page ?>/<?php echo $total_page ?></span>
  </div>
  <div class="paginator">
    <?php if($page != 1) { ?>
      <a href="index.php?page=1">首頁</a>
      <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
    <?php } ?>
    <?php if($page != $total_page) { ?>
      <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
      <a href="index.php?page=<?php echo $total_page ?>">最後一頁</a>
    <?php } ?>
  </div>
</main>
<script>
  document.querySelector('.update-nickname').addEventListener('click', () => {
    var form = document.querySelector('.board__nickname-form')
    form.classList.toggle('hide')
  })
</script>
</body>
</html> 