<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/about.css">
  <link rel="stylesheet" href="css/contact.css">

  <title>お問い合わせ　確認</title>
</head>
<body>
<input type="hidden" name="message" value="<?php echo htmlspecialchars($message,ENT_QUOTES,"UTF-8");?>">
<input type="hidden" name="radio" value="<?php echo htmlspecialchars($radio,ENT_QUOTES,"UTF-8");?>">
<input type="hidden" name="company_name" value="<?php echo htmlspecialchars($company_name,ENT_QUOTES,"UTF-8");?>">
<input type="hidden" name="fullname" value="<?php echo htmlspecialchars($fullname,ENT_QUOTES,"UTF-8");?>">
<input type="hidden" name="ruby" value="<?php echo htmlspecialchars($ruby,ENT_QUOTES,"UTF-8");?>">
<input type="hidden" name="email" value="<?php echo htmlspecialchars($email,ENT_QUOTES,"UTF-8");?>">
<input type="hidden" name="tel" value="<?php echo htmlspecialchars($tel,ENT_QUOTES,"UTF-8");?>">
<input type="hidden" name="post_code" value="<?php echo htmlspecialchars($post_code,ENT_QUOTES,"UTF-8");?>">
<input type="hidden" name="address" value="<?php echo htmlspecialchars($address,ENT_QUOTES,"UTF-8");?>">

<dl>
  <dt>お問い合わせ内容</dt>
  <dd><?php echo htmlspecialchars($message,ENT_QUOTES,"UTF-8");?></dd>
  <dt>お問い合わせ種別</dt>
  <dd><?php echo htmlspecialchars($radio,ENT_QUOTES,"UTF-8");?></dd>
  <dt>会社名</dt>
  <dd><?php echo htmlspecialchars($ompany_name,ENT_QUOTES,"UTF-8");?></dd>
  <dt>お名前</dt>
  <dd><?php echo htmlspecialchars($fullname,ENT_QUOTES,"UTF-8");?></dd>
  <dt>フリガナ</dt>
  <dd><?php echo htmlspecialchars($ruby,ENT_QUOTES,"UTF-8");?></dd>
  <dt>E-mail</dt>
  <dd><?php echo htmlspecialchars($email,ENT_QUOTES,"UTF-8");?></dd>
  <dt>電話番号</dt>
  <dd><?php echo htmlspecialchars($tel,ENT_QUOTES,"UTF-8");?></dd>
  <dt>ご住所</dt>
  <dd><?php echo htmlspecialchars($post_code,ENT_QUOTES,"UTF-8");?></dd>
    <dd><?php echo htmlspecialchars($address,ENT_QUOTES,"UTF-8");?></dd>

</dl>
<input type="button" value="戻る" onClick="history.back()">
<input type="submit" value="送信">
</body>
</html>
