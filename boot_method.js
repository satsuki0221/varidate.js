new varidation({
	submitBtn: '#submit',
	// サブミットボタンがクリックされたらというイベントを登録するので、idを記載します(classでも可)。
	fixedSize : 60 ,
	/*
	varidateの際にエラーが発生すると、その位置までスムーズスクロールで戻します。ヘッダーを上部に固定している際に
	ヘッダーが戻ったinput,selectに被ってしまうのを防止するために、ヘッダーの高さを教えることで、
	被らないように調整しています。
	*/
	SubmitBefore : function(){
		// サブミットがされるまえに呼び出されるコールバック関数です。
		console.log('aaa');
	},
	name : {  // nameは不要だが、何を見ているかがわからなくなるので、input、selectのnameをkeyにしておくとわかりやすいので。
		common : {
			selecter : '#form_id_1', // input、selectのID,Classを登録します。 Idの方が良いと思います。
		}
	},
	phone : {
	// 各種オプションを上書きするように記載します。
		common : {
			selecter : '#form_id_3',
			telpost   : true,
			// trueにすることで、それに対応したprototypeのvaridateを呼び出します。
		},
		options  : {
			minlength : 11,
			// 最小の文字数を登録します。defaultは０です。
			maxlength : 11
			// 最大の文字数を登録します。defaultはありません。
		},
		messages : {
		// 初期のメッセージを書き換えることができます。 同じ文章を設定することで、エラーを書き出す際に1つにまとめることができます。
			telpost: "電話番号が正しくありません",
			minlength : "電話番号が正しくありません",
			maxlength : "電話番号が正しくありません"
		}
	}
});
