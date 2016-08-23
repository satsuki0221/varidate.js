mocha.setup('bdd');
var assert = chai.assert;
window.onload = mocha.run;

// ここからテスト
describe("varidationのテスト", function() {

	it("必須項目 true確認", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{required : false}
		} ).required('aaa') );
	});

	it("必須項目 false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{required : false}
		} ).required('') );
	});

	it("必須項目 false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{required : false}
		} ).required() );
	});

	it("カナ入力 true確認", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{kana : false}
		} ).kana('アア') );
	});

	it("カナ入力 false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ kana : false}
		} ).kana('ああ') );
	});

	it("カナ入力 false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ kana : false}
		} ).kana(  ) );
	});

	it("数値入力 true確認", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{number : false}
		} ).number("123") );
	});

	it("数値入力 false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ number : false}
		} ).number('ああ') );
	});

	it("数値入力 false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ number : false}
		} ).number() );
	});


	it("電話番号、郵便番号入力 true確認", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{telpost : false}
		} ).telpost("0901111522") );
	});

	it("電話番号、郵便番号入力 false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ telpost : false}
		} ).telpost('電話番号、郵便番号') );
	});

	it("電話番号、郵便番号入力 false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ telpost : false}
		} ).telpost() );
	});


	it("最大入力数 true確認(少なめ)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{ maxlength : 10 },
			messages:{maxlength : false}
		} ).maxlength("012345678") );
	});

	it("最大入力数 true確認(ぴったり)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{ maxlength : 10 },
			messages:{maxlength : false}
		} ).maxlength("0123456789") );
	});

	it("最大入力数 false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{ maxlength : 10 },
			messages:{ maxlength : false}
		} ).maxlength("0123456789101112") );
	});

	it("最大入力数 false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{ maxlength : 10  },
			messages:{ maxlength : false}
		} ).maxlength() );
	});


	it("最小入力数 true確認(多め)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{ minlength : 5 },
			messages:{minlength : false}
		} ).minlength("0123456") );
	});

	it("最小入力数 true確認(ぴったり)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{ minlength : 5 },
			messages:{minlength : false}
		} ).minlength("01234") );
	});

	it("最小入力数 false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{ minlength : 5 },
			messages:{ minlength : false}
		} ).minlength("0123") );
	});

	it("最小入力数 false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{ minlength : 10  },
			messages:{ minlength : false}
		} ).minlength() );
	});


	it("メールアドレス true確認", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{mail : false}
		} ).mail("test@gmail.com") );
	});

	it("メールアドレス false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ mail : false}
		} ).mail("t0123@fas") );
	});

	it("メールアドレス false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ mail : false}
		} ).mail() );
	});


	it("英数字のみ true確認", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{alphanumeric : false}
		} ).alphanumeric("test1234") );
	});

	it("英数字のみ false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ alphanumeric : false}
		} ).alphanumeric("あああaaa") );
	});

	it("英数字のみ false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ alphanumeric : false}
		} ).alphanumeric() );
	});


	it("大文字英字のみ true確認", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{alphaupper : false}
		} ).alphaupper("TEST") );
	});

	it("大文字英字のみ false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ alphaupper : false}
		} ).alphaupper("aaaaaaa") );
	});

	it("大文字英字のみ false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ alphaupper : false}
		} ).alphaupper() );
	});


	it("数字が1文字以上入っているか true確認", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{num_one_char : false}
		} ).num_one_char("TEST1") );
	});

	it("数字が1文字以上入っているか false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ num_one_char : false}
		} ).num_one_char("aaaaaaa") );
	});

	it("数字が1文字以上入っているか false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ num_one_char : false}
		} ).num_one_char() );
	});


	it("同じ内容が記入されているか true確認", function() {
		assert.equal( true , new varidateModel({
			common:{ check : "#checkTest"},
			options:{},
			messages:{check : false}
		} ).check("hogehoge") );
	});

	it("同じ内容が記入されているか false確認", function() {
		assert.equal( false , new varidateModel({
			common:{ check : "#checkTest"},
			options:{},
			messages:{ check : false}
		} ).check("aaaaaaa") );
	});

	it("同じ内容が記入されているか false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{ check : "#checkTest"},
			options:{},
			messages:{ check : false}
		} ).check() );
	});

	it("クレジットカード true確認 (Visa)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{credit : false}
		} ).credit("4012888888881881") );
	});

	it("クレジットカード true確認 (MasterCard)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{credit : false}
		} ).credit("5555555555554444") );
	});

	it("クレジットカード true確認 (JCB)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{credit : false}
		} ).credit("3530111333300000") );
	});

	it("クレジットカード true確認 (American Express)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{credit : false}
		} ).credit("378282246310005") );
	});

	it("クレジットカード true確認 (Diners Club)", function() {
		assert.equal( true , new varidateModel({
			common:{},
			options:{},
			messages:{credit : false}
		} ).credit("30569309025904") );
	});

	it("クレジットカード false確認", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ credit : false}
		} ).credit("48520000023237") );
	});

	it("クレジットカード false確認(undefined)", function() {
		assert.equal( false , new varidateModel({
			common:{},
			options:{},
			messages:{ credit : false}
		} ).credit() );
	});

});
