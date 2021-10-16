<form class="form-signin" method="post" id="login-form" action={{ route('login') }}>
    <!--h2 class="form-signin-heading">Для Сенсеїв, Семпаїв та найкращих спортсменів</h2-->
    <p class="form-signin-heading">Для Сенсеїв, Семпаїв та найкращих спортсменів</p>
    <div id="error">
        <!-- error will be shown here ! -->
    </div>

    <div class="form-group">
        <input type="email" class="form-control" placeholder="Email адреса" name="user_email" id="user_email" />
        <span id="check-e"></span>
    </div>

    <div class="form-group">
        <input type="password" class="form-control" placeholder="Пароль" name="password" id="password" />
    </div>

    <div class="form-group">
        <button type="submit" class="btn btn-primary" name="btn-login" id="btn-login"><span class="glyphicon glyphicon-log-in"></span> &nbsp;
            Увійти
        </button>

        <!--button type="submit" class="btn btn-default" name="btn-login" id="btn-login">
									<span class="glyphicon glyphicon-log-in"></span> &nbsp; Увійти
								</button-->
    </div>
</form>