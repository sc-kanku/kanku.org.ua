<?php
session_start();
unset($_SESSION['user_session']);
session_destroy();

if (isset($_COOKIE['userId'])) {
    unset($_COOKIE['userId']);
    setcookie('userId', null, -1, '/');
}

if (isset($_COOKIE['userName'])) {
    unset($_COOKIE['userName']);
    setcookie('userName', null, -1, '/');
}

if (isset($_COOKIE['userRoles'])) {
    unset($_COOKIE['userRoles']);
    setcookie('userRoles', null, -1, '/');
}

echo "ok";
?>