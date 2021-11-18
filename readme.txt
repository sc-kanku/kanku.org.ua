Щоб локально розгорнути версію

$ git clone https://github.com/sc-kanku/kanku.org.ua.git

Експортнути собі базу з kanku.org.ua і імпортнути її собі локально.

Знайти файл .env.example, скопіювати його тут же, назвати .env, відкрити і
проредагувати настройки бази на свої локальні, наприклад
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=shinkanku
DB_USERNAME=root
DB_PASSWORD=

В терміналі зайти в директорію з викачаним kanku.org.ua
> npm install

> php artisan serve

Щоб зміни з /resourses/css/* і /resourses/js/* автоматично на льоту самі збирались
 і копіювались в /public/css і /public/js :

> cd kanku.org.ua
> npm run watch

при цьому, якщо потрібно формувати app.css / app.js
(включаються в неадміністративну частину сайту),
то перед запуском 'npm run watch' необхідно знайти в корені файл webpack.mix.js
і розкоментувати рядки 27-31, а 17-22 закоментувати;
і навпаки - якщо потрібно формувати admin.css / admin.js
(включаються в адміністративну частину сайту),
то перед запуском 'npm run watch' необхідно
розкоментувати рядки 27-31, а 17-22 закоментувати.
