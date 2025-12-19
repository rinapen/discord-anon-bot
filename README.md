# Discord 匿名投稿Bot

Discord上で匿名および非匿名の投稿を管理するためのBotです。スレッド機能、投稿の引用、ブラックリストによる検閲など、豊富な機能を提供します。

## 目次

- [特徴](#特徴)
- [必要要件](#必要要件)
- [インストール](#インストール)
- [環境変数の設定](#環境変数の設定)
- [使い方](#使い方)
- [機能詳細](#機能詳細)
- [データベース構造](#データベース構造)
- [開発](#開発)
- [ライセンス](#ライセンス)

## 特徴

- **匿名投稿**: ユーザーが匿名で投稿できる機能
- **非匿名投稿**: 実名での投稿も可能
- **スレッド管理**: ユーザーが独自のスレッドを作成・管理
- **投稿の引用**: `>>番号`または`^番号`形式で他の投稿を引用
- **ブラックリスト検閲**: 不適切な単語を自動的に検閲（150語以上登録済み）
- **ユニークID**: 匿名投稿者に対して日替わりでユニークIDを付与
- **リアクション**: 自動的に絵文字リアクションを追加
- **通報機能**: 不適切な投稿を通報できる
- **ログ記録**: 全ての投稿をログチャンネルに記録
- **高パフォーマンス**: 正規表現の事前コンパイル、並列処理、DB一括更新

## 必要要件

- **Node.js**: v16.9.0 以上
- **MongoDB**: v4.0 以上
- **Discord Bot Token**: [Discord Developer Portal](https://discord.com/developers/applications)から取得

## インストール

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/anonymous.git
cd anonymous
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 環境変数ファイルを作成

`.env`ファイルをプロジェクトルートに作成してください（詳細は次のセクション）。

### 4. Botを起動

```bash
# 開発モード（自動再起動）
npm run dev

# 本番モード
node index.js
```

## 環境変数の設定

プロジェクトルートに`.env`ファイルを作成し、以下の内容を設定してください：

```env
# Discord Bot Token
BOT_TOKEN=your_discord_bot_token_here

# サーバーID
MAIN_SERVER_ID=your_main_server_id

# チャンネルID
MAIN_TIMELINE_CHANNEL=your_timeline_channel_id
MAIN_THREAD_PARENT=your_thread_category_id

# ログチャンネル
LOGCHANNEL=your_log_channel_id
REPORT_CHANNEL_ID=your_report_channel_id

# MongoDB接続URL
MONGODB_URL=mongodb://localhost:27017/anonymous_bot
```

### 環境変数の説明

| 変数名 | 説明 |
|--------|------|
| `BOT_TOKEN` | DiscordボットのトークンID |
| `MAIN_SERVER_ID` | メインDiscordサーバーのID |
| `MAIN_TIMELINE_CHANNEL` | 投稿を表示するタイムラインチャンネルのID |
| `MAIN_THREAD_PARENT` | スレッドを格納するカテゴリのID |
| `LOGCHANNEL` | 投稿ログを記録するチャンネルのID |
| `REPORT_CHANNEL_ID` | 通報を受け取るチャンネルのID |
| `MONGODB_URL` | MongoDBの接続URL |

## 使い方

### 基本的な投稿

1. 匿名または非匿名のチャンネルでメッセージを送信
2. Botが自動的にタイムラインに投稿を転送
3. 投稿にリアクション絵文字が自動追加されます

### スレッドの作成

1. タイムラインの「スレッド」ボタンをクリック
2. モーダルでタイトルと本文を入力
3. スレッドが作成され、専用チャンネルが生成されます

### スレッドの削除

1. タイムラインの「スレ削除」ボタンをクリック
2. 自分が作成したスレッドが削除されます

### 投稿の引用

#### 方法1: シンプルな引用
```
>>123
これはコメントです
```
投稿番号123へのリンクが自動的に生成されます。

#### 方法2: 引用元の内容を表示
```
^123 コメント
```
投稿番号123の内容が枠で囲まれて表示されます。

### 通報

1. 「通報」ボタンをクリック
2. 通報内容を入力
3. 管理者チャンネルに通報が送信されます

## 機能詳細

### チャンネル命名規則

- **匿名タイムライン**: `匿名-` で始まる
- **非匿名タイムライン**: `非匿名-` で始まる
- **匿名スレッド**: `t-匿名` で始まる
- **非匿名スレッド**: `t-非匿名` で始まる

### ブラックリスト検閲

`blacklist.json`に登録された単語は自動的に`***`に置き換えられます。

- 暴言・誹謗中傷
- 性的表現
- 差別用語
- スパムURL（短縮URLサービス含む）
- 詐欺関連ワード

**現在150語以上が登録されています。**

### ユニークIDシステム

- 匿名投稿者には12桁のランダムIDが付与されます
- IDは毎日0時（日本時間）にリセットされます
- 同じユーザーは同じ日なら同じIDを持ちます

### 権限バッジ

非匿名投稿時、以下のバッジが自動的に表示されます：

- **👑 オーナーバッジ**: スレッド作成者
- **🛡️ 管理者バッジ**: サーバー管理者

## データベース構造

### Post（投稿）

```javascript
{
  postCount: Number,      // グローバル投稿番号
  uniqueID: String,       // 匿名ユーザーのユニークID
  author: String,         // DiscordユーザーID
  authorName: String,     // 表示名
  content: String,        // 投稿内容
  url: Map<String>,       // サーバーごとの投稿URL
  imageURL: String,       // 添付画像URL
  timestamp: Date         // 投稿日時
}
```

### Thread（スレッド）

```javascript
{
  userId: String,         // 作成者のDiscordユーザーID
  channelIds: {
    main: String,         // メインチャンネルID
  },
  threadName: String,     // スレッド名
  postCounter: Number     // スレッド内の投稿カウント
}
```

### ThreadPost（スレッド投稿）

投稿（Post）と同じ構造ですが、スレッド専用です。

### UniqueID（ユニークID管理）

```javascript
{
  userId: String,         // DiscordユーザーID
  uniqueID: String,       // 生成されたユニークID
  updatedAt: Date         // 更新日時
}
```

### GlobalPostCount（グローバルカウンター）

```javascript
{
  postCount: Number       // 現在の投稿総数
}
```

## 開発

### プロジェクト構造

```
anonymous/
├── index.js              # メインBotファイル（MongoDB接続も管理）
├── package.json          # 依存関係
├── blacklist.json        # ブラックリスト単語
├── models/               # Mongooseモデル（接続コードなし）
│   ├── Post.js           # コレクション: discord-anon-posts
│   ├── Thread.js         # コレクション: discord-anon-threads
│   ├── ThreadPost.js     # コレクション: discord-anon-threadposts
│   ├── UniqueID.js       # コレクション: discord-anon-uniqueids
│   └── GlobalPostCount.js # コレクション: discord-anon-globalpostcount
└── utils/                # ユーティリティ関数
    └── utils.js          # ユニークID生成
```

### MongoDB接続について

- **接続は1回のみ**: `index.js`で一元管理
- **各モデルファイル**: 接続コードを含まず、スキーマ定義のみ
- **パフォーマンス**: 重複接続を排除し、効率的に動作

### 開発モード

```bash
npm run dev
```

Nodemonが自動的にファイルの変更を検知して再起動します。

### コードスタイル

- **定数**: `UPPER_SNAKE_CASE`
- **関数**: `camelCase`
- **async/await**: Promiseの代わりに使用
- **エラーハンドリング**: try-catchで適切に処理
- **コメント**: 日本語で記述

## カスタマイズ

### ブラックリストの編集

`blacklist.json`を編集して、検閲する単語を追加・削除できます：

```json
[
  "不適切な単語1",
  "不適切な単語2",
  "..."
]
```

### 絵文字の変更

`index.js`の定数セクションで変更できます：

```javascript
// リアクション絵文字
const REACTION_EMOJIS = ["❤", "😂", "🥺"];

// バッジ（カスタム絵文字IDまたはUnicode絵文字）
const OWNER_EMOJI = "<:owner:1220362869439467591>";  // オーナーバッジ
const ADMIN_EMOJI = "<:Admin:1249110303593992202>";  // 管理者バッジ

// ボタン絵文字（Unicode絵文字を推奨）
// .setEmoji("📝")  - Unicode絵文字（すべてのサーバーで動作）
// .setEmoji({ id: "絵文字ID" })  - カスタム絵文字（Botがアクセスできるサーバーのみ）
```

**注意**: カスタム絵文字を使用する場合は、BotがそのサーバーにいるかDiscord Nitroが必要です。

### 埋め込みカラーの変更

```javascript
const EMBED_COLOR = 0x2b2d31;  // 16進数カラーコード
```

## トラブルシューティング

### Bot が起動しない

1. `.env`ファイルが正しく設定されているか確認
2. MongoDBが起動しているか確認
3. Bot TokenとServer IDが正しいか確認

### 投稿が表示されない

1. チャンネル名が命名規則に従っているか確認
2. Botにチャンネルへの書き込み権限があるか確認
3. `MAIN_TIMELINE_CHANNEL`が正しく設定されているか確認

### ユニークIDがリセットされない

1. サーバーのタイムゾーンを確認
2. node-scheduleが正しく動作しているか確認
3. MongoDBへの接続が安定しているか確認

## 📊 パフォーマンス最適化

このBotは以下の最適化が施されています：

- ✅ ブラックリスト正規表現の事前コンパイル
- ✅ 添付ファイルの並列送信（Promise.all）
- ✅ データベース一括更新（bulkWrite）
- ✅ 不要なDB検索の削除
- ✅ 効率的なnullチェック

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📝 変更履歴

### v2.0.0 (最新)
- 🔴 重大なバグ修正（未定義変数、nullチェック）
- ⚡ パフォーマンス大幅改善
- 🧹 コード整理とリファクタリング
- 📝 定数化と可読性向上
- 🛡️ エラーハンドリング強化

### v1.0.0
- 初回リリース
- 基本的な匿名投稿機能
- スレッド管理機能
- ブラックリスト検閲

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📧 お問い合わせ

質問や提案がある場合は、GitHubのIssueを作成してください。

---

**Enjoy anonymous posting! 🎭**