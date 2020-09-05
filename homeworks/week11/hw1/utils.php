<?php
  require_once('conn.php');

  function generateToken() {
    $s = '';
    for($i=1; $i<=16; $i++) {
      $s .= chr(rand(65,90));
    }
    return $s;
  }

  function getUserFromUsername($username) {
    global $conn;

    $sql = sprintf(
      "SELECT * FROM ai86109_users WHERE username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function hasAuthority($row, $username, $user) {
    if($user['role'] == 2) {
      return true;
    } else if($user['role'] <= 1) {
      return $row['username'] === $username;
    };
    return false;
  }
?>