#![logo](https://github.com/utubo/are4are/raw/master/src/icons/are4are-32.png)アレを見やすくするアレ

やっつけ

AndroidのFirefoxのアドオンです  
ふたばっぽいページを見やすく加工します  
設定画面でURLを追加すれば保管庫とかでも動きます  
でもフレームには対応してませんごめん

##インストール(現状)
1. Firefoxβをインストール
1. `about:config`を開いて`xpinstall.signatures.required`を`false`に設定
1. 以下のどれかをインストール  
 - おすすめ(githubにプッシュしたやつ)  
<http://x123.x0.to/~rawgit/are.xpi>
 - 最新だけど超不安定バグあり(自宅サーバに上げてテストする用)  
<http://utb.dip.jp:8001/~utb/temp/are.xpi>
 - 承認済みだけど古い  
<https://addons.mozilla.org/ja/firefox/addon/アレを見やすくするアレ/>  

##外部URLの登録
###手順
カタログ設定画面からアドオンの設定画面にいけるので  
「外部板」の欄にURLを貼り付けて開き直せばOK

###詳細な手順
1. 外部スレッドを開いてURLをコピーしておく
1. ふたばのカタログを開いてちょっと上にスクロールさせる
1. 「設定」リンクをクリック
1. 「アレを見やすくするアレ - 設定」というリンクがあるのでクリック
1. 外部板の欄にURLをペーストする(自動で正規表現になります)
1. 「保存」を押す
1. スレッドを再読み込みすれば適用されるよ

ダメなときは正規表現を修正してね

##承認済みバージョンとの違い
(var4.2 → var4.3)
* 機能追加
 * 設定無しでもFTBucketに適用するようにしました
 * 1ページ目に対応しました
 * カタログで表示している内で古いスレ5つを赤枠で表示するようにしました
* 機能調整
 * 表示速度を少し改善しました
 * 一番下までスクロールするときにページ全体の一番下ではなく最後のレスにスクロールするようにしました
 * 外部板入力欄にURLを貼り付けるとき「^」で始まって「$」で終わる場合は最後に追記するようにしました
 * futaboardでもそれなりに動くようにしました
 * バグをいくつか修正しました

(var3.0.1 → var4.X)
* 全面的に作り直し(Webextensionsで)

