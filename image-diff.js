const imageDiff = require('image-diff');
// Doc: https://www.npmjs.com/package/image-diff

imageDiff({
    actualImage:   'png/saku_fun_pc.png',     // 元画像
    expectedImage: 'png/saku.fun_pc_test.png',// 比較画像
    diffImage:     'png/saku.fun_pc_diff.png',// 比較後の画像
    shadow:        true,                      // 元画像を表示　false->差分だけを表示
},(err, imagesAreSame) => {
    // callback
    console.log(err);
    console.log(imagesAreSame);// 比較時の真偽値
});
