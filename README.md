# url-to-pdf

Webサイトをスクラップするのに良いのが無かったので自分で作成。

サクッとURLからPDFとPNGを作成するやーつ。

DOMでしゅんしゅんする系サイトはうまく取れないことがあるけど。。

## 使い方

クローンしたディレクトリで以下のコマンドを使い、パッケージの復元

``` bash
$ npm install
```

## オプション

``` sh
$ node main.js --help

Usage: main.js [options]

	--help, -h
		Displays help information about this script
		'main.js -h' or 'main.js --help'

	--list, -l
		URLリストのファイルを指定
		"this.js -l url-list.txt" or "this.js --list=url-list.txt"

	--url, -u
		URLを単体で指定
		"this.js -u https://siteurl" or "this.js --url=https://siteurl"

	--auth, -a
		BASIC認証のUSERとPWを指定
		"this.js -b 'user:passwd'" or "this.js --basic='user:passwd'"
```
