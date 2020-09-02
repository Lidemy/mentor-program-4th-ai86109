<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  if($user['role'] < 2) {
    header('Location: index.php');
    die();
  }

  $stmt = $conn->prepare("SELECT * FROM ai86109_users");
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
  <h1 class="board__title">後台管理系統</h1>
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
  <section>
    <a class="board__btn" href="index.php">回到前台</a>
    <div class="table">
      <table>
        <tr>
          <th>username</th>
          <th>nickname</th>
          <th>role</th>
          <th>編輯權限</th>
        </tr>
        <?php while($row = $result->fetch_assoc()) { ?>
        <tr>
          <td><?php echo $row['username'] ?></td>
          <td><?php echo $row['nickname'] ?></td>
          <td><?php echo $row['role'] ?></td>
          <td>
            <a href="handle_update_authority.php?role=0&id=<?php echo $row['id'] ?>">停權</a>
            <a href="handle_update_authority.php?role=1&id=<?php echo $row['id'] ?>">一般使用者</a>
            <a href="handle_update_authority.php?role=2&id=<?php echo $row['id'] ?>">管理員</a>
          </td>
        </tr>
        <?php } ?>
      </table>
    </div>
  </section>
</main>
</body>
</html> 