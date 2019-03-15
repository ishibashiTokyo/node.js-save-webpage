# url-to-pdf

Webサイトをスクラップするのに良いのが無かったので自分で作成。

サクッとURLからPDFとPNGを作成するやーつ。

DOMでしゅんしゅんする系サイトはうまく取れないことがあるけど。。

## use

クローンしたディレクトリで以下のコマンドを使い、パッケージの復元

``` bash
$ npm install
```

URLからPDFとPNGを作成。

``` bash
$ node main.js https://siteurl
```

BASIC認証は以下のように引数を追加。

``` bash
$ node main.js https://siteurl 'USER:PASSWD'
```
