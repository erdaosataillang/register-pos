# レジ
スマホ・PC対応、担当者の名前だけで使える現金レジ。

- 商品名・税込価格・カテゴリーの追加、編集、削除
- カート、数量変更、預かり金額、釣銭
- 日本時間の日付ごとに100から始まる注文番号
- 注文履歴、当日売上、CSV出力
- Firebase Firestoreへ保存し端末間でリアルタイム共有

既存Firebaseプロジェクト urakata-app 内の registerShops を専用領域として使用。Web SDK設定は公開用のクライアント設定で、管理者の秘密鍵は含まない。

アカウント登録の画面はなく、Firebase匿名認証を自動で実行。担当者名は本人確認ではない。Firebase側のアクセスルール設定が別途必要。

初期商品は空。「商品管理」から商品を登録。会計確定にはオンライン接続が必要。会計番号は日付と組み合わせて識別する。カード決済は未対応。

## GitHub Pages
Settings → Pages → Source を GitHub Actions に設定。mainへのpushで自動公開。

## Firebaseルール
firestore.rules.example はレジ用の追加ルールのみ。既存のFirestoreルール全体をこのファイルで上書きしないこと。既存ルール内へ追加する。
